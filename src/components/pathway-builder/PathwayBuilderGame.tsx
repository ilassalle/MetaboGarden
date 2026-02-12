'use client';

import { useState, useMemo, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { Pathway } from '@/data/types';
import type { SlotAssignment, ValidationResult } from '@/lib/game-engine';
import { validatePathway } from '@/lib/game-engine';
import { shuffle } from '@/lib/shuffle';
import ItemBank from './ItemBank';
import type { BankItem } from './ItemBank';
import DropZone from './DropZone';
import DraggableItem from './DraggableItem';
import type { ItemType } from './DraggableItem';
import BuilderFeedback from './BuilderFeedback';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Maps stepNumber -> SlotAssignment with labels for display */
interface AssignmentWithLabels extends SlotAssignment {
  enzymeLabel?: string;
  substrateLabel?: string;
  productLabel?: string;
}

type AssignmentMap = Record<number, AssignmentWithLabels>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build the bank of draggable items from pathway steps, deduplicated by id */
function buildBankItems(pathway: Pathway): BankItem[] {
  const seen = new Set<string>();
  const items: BankItem[] = [];

  for (const step of pathway.steps) {
    // Enzyme
    if (!seen.has(step.enzyme.id)) {
      seen.add(step.enzyme.id);
      items.push({
        id: `enzyme-${step.enzyme.id}`,
        label: step.enzyme.name,
        type: 'enzyme',
      });
    }

    // Substrates (first substrate per step for the game)
    const sub = step.substrates[0];
    if (sub && !seen.has(sub.id)) {
      seen.add(sub.id);
      items.push({
        id: `substrate-${sub.id}`,
        label: sub.name,
        type: 'substrate',
      });
    }

    // Products (first product per step for the game)
    const prod = step.products[0];
    if (prod && !seen.has(prod.id)) {
      seen.add(prod.id);
      items.push({
        id: `product-${prod.id}`,
        label: prod.name,
        type: 'product',
      });
    }
  }

  return items;
}

/** Parse a dragId like "enzyme-hexokinase" into { type, rawId } */
function parseDragId(dragId: string): { type: ItemType; rawId: string } | null {
  const prefixes: ItemType[] = ['enzyme', 'substrate', 'product'];
  for (const prefix of prefixes) {
    if (dragId.startsWith(`${prefix}-`)) {
      return { type: prefix, rawId: dragId.slice(prefix.length + 1) };
    }
  }
  return null;
}

/** Parse a dropZone id like "drop-3-enzyme" into { stepNumber, slotType } */
function parseDropId(dropId: string): { stepNumber: number; slotType: ItemType } | null {
  const match = dropId.match(/^drop-(\d+)-(enzyme|substrate|product)$/);
  if (!match) return null;
  return { stepNumber: parseInt(match[1], 10), slotType: match[2] as ItemType };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PathwayBuilderGameProps {
  pathway: Pathway;
}

export default function PathwayBuilderGame({ pathway }: PathwayBuilderGameProps) {
  // --- Shuffled bank items (stable for the session, re-shuffled on reset) ---
  const [shuffleKey, setShuffleKey] = useState(0);
  const bankItems = useMemo(() => shuffle(buildBankItems(pathway)), [pathway, shuffleKey]);

  // --- Assignments state ---
  const initialAssignments: AssignmentMap = useMemo(() => {
    const map: AssignmentMap = {};
    for (const step of pathway.steps) {
      map[step.stepNumber] = { stepNumber: step.stepNumber };
    }
    return map;
  }, [pathway]);

  const [assignments, setAssignments] = useState<AssignmentMap>(initialAssignments);

  // --- Submission state ---
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // --- Active drag for overlay ---
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // --- Sensor with distance threshold to avoid accidental drags ---
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // --- Set of dragIds currently placed in slots ---
  const usedIds = useMemo(() => {
    const set = new Set<string>();
    for (const a of Object.values(assignments)) {
      if (a.enzymeId) set.add(`enzyme-${a.enzymeId}`);
      if (a.substrateId) set.add(`substrate-${a.substrateId}`);
      if (a.productId) set.add(`product-${a.productId}`);
    }
    return set;
  }, [assignments]);

  // --- Drag handlers ---
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragId(null);

      const { active, over } = event;
      if (!over) return;

      const dragParsed = parseDragId(active.id as string);
      const dropParsed = parseDropId(over.id as string);
      if (!dragParsed || !dropParsed) return;

      // Only allow dropping the right type into the right slot
      if (dragParsed.type !== dropParsed.slotType) return;

      const dragLabel = (active.data.current?.label as string) ?? dragParsed.rawId;

      setAssignments((prev) => {
        const next = { ...prev };
        const existing = next[dropParsed.stepNumber] ?? { stepNumber: dropParsed.stepNumber };

        // Build the key names for the assignment
        const idKey = `${dragParsed.type}Id` as 'enzymeId' | 'substrateId' | 'productId';
        const labelKey = `${dragParsed.type}Label` as 'enzymeLabel' | 'substrateLabel' | 'productLabel';

        next[dropParsed.stepNumber] = {
          ...existing,
          [idKey]: dragParsed.rawId,
          [labelKey]: dragLabel,
        };
        return next;
      });
    },
    [],
  );

  // --- Remove an item from a slot ---
  const handleRemove = useCallback(
    (stepNumber: number, slotType: ItemType) => {
      if (submitted) return;
      setAssignments((prev) => {
        const next = { ...prev };
        const existing = next[stepNumber];
        if (!existing) return prev;

        const idKey = `${slotType}Id` as 'enzymeId' | 'substrateId' | 'productId';
        const labelKey = `${slotType}Label` as 'enzymeLabel' | 'substrateLabel' | 'productLabel';

        next[stepNumber] = { ...existing, [idKey]: undefined, [labelKey]: undefined };
        return next;
      });
    },
    [submitted],
  );

  // --- Check answers ---
  const handleCheck = useCallback(() => {
    const assignmentList: SlotAssignment[] = Object.values(assignments).map((a) => ({
      stepNumber: a.stepNumber,
      enzymeId: a.enzymeId,
      substrateId: a.substrateId,
      productId: a.productId,
    }));

    const { results, score: computedScore } = validatePathway(assignmentList, pathway.steps);
    setValidationResults(results);
    setScore(computedScore);
    setSubmitted(true);
    setShowFeedback(true);
  }, [assignments, pathway.steps]);

  // --- Reset ---
  const handleReset = useCallback(() => {
    setAssignments(initialAssignments);
    setSubmitted(false);
    setScore(null);
    setValidationResults([]);
    setShowFeedback(false);
    setShuffleKey((k) => k + 1);
  }, [initialAssignments]);

  // --- Lookup helpers for validation results ---
  const getValidation = useCallback(
    (stepNumber: number) => validationResults.find((r) => r.stepNumber === stepNumber),
    [validationResults],
  );

  const getCorrectness = useCallback(
    (stepNumber: number, slotType: ItemType): boolean | null => {
      if (!submitted) return null;
      const v = getValidation(stepNumber);
      if (!v) return null;
      if (slotType === 'enzyme') return v.enzymeCorrect;
      if (slotType === 'substrate') return v.substrateCorrect;
      if (slotType === 'product') return v.productCorrect;
      return null;
    },
    [submitted, getValidation],
  );

  // --- Drag overlay item data ---
  const activeBankItem = activeDragId ? bankItems.find((b) => b.id === activeDragId) : null;

  // --- Number of filled slots (to decide if check button is enabled) ---
  const filledCount = Object.values(assignments).reduce(
    (sum, a) => sum + (a.enzymeId ? 1 : 0) + (a.substrateId ? 1 : 0) + (a.productId ? 1 : 0),
    0,
  );
  const totalSlots = pathway.steps.length * 3;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ---- LEFT: Item Bank ---- */}
        <div className="lg:w-72 lg:shrink-0">
          <div className="lg:sticky lg:top-20">
            <ItemBank items={bankItems} usedIds={usedIds} />

            {/* Progress indicator */}
            <div className="mt-3 text-xs text-green-600/60 text-center">
              {filledCount} / {totalSlots} slots filled
            </div>
          </div>
        </div>

        {/* ---- RIGHT: Pathway Board ---- */}
        <div className="flex-1 min-w-0">
          {/* Steps */}
          <div className="space-y-4">
            {pathway.steps.map((step, idx) => {
              const a = assignments[step.stepNumber];
              return (
                <div
                  key={step.id}
                  className="bg-white rounded-2xl border border-green-200 p-4"
                >
                  {/* Step header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-green-900">
                        {step.reactionName}
                      </h4>
                      {step.phaseName && (
                        <span className="text-[10px] text-green-500 uppercase tracking-wider">
                          {step.phaseName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Drop zones row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <DropZone
                      id={`drop-${step.stepNumber}-enzyme`}
                      label="Enzyme"
                      acceptType="enzyme"
                      currentItem={a?.enzymeLabel}
                      isCorrect={getCorrectness(step.stepNumber, 'enzyme') ?? undefined}
                      onRemove={
                        !submitted && a?.enzymeId
                          ? () => handleRemove(step.stepNumber, 'enzyme')
                          : undefined
                      }
                    />
                    <DropZone
                      id={`drop-${step.stepNumber}-substrate`}
                      label="Substrate"
                      acceptType="substrate"
                      currentItem={a?.substrateLabel}
                      isCorrect={getCorrectness(step.stepNumber, 'substrate') ?? undefined}
                      onRemove={
                        !submitted && a?.substrateId
                          ? () => handleRemove(step.stepNumber, 'substrate')
                          : undefined
                      }
                    />
                    <DropZone
                      id={`drop-${step.stepNumber}-product`}
                      label="Product"
                      acceptType="product"
                      currentItem={a?.productLabel}
                      isCorrect={getCorrectness(step.stepNumber, 'product') ?? undefined}
                      onRemove={
                        !submitted && a?.productId
                          ? () => handleRemove(step.stepNumber, 'product')
                          : undefined
                      }
                    />
                  </div>

                  {/* Arrow connector (except last step) */}
                  {idx < pathway.steps.length - 1 && (
                    <div className="flex justify-center mt-3">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-300">
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {!submitted ? (
              <>
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={filledCount === 0}
                  className={`
                    px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors
                    ${filledCount === 0
                      ? 'bg-green-200 text-green-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                    }
                  `}
                >
                  Check Pathway
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl border border-green-200 text-green-700 text-sm font-semibold hover:bg-green-50 transition-colors"
                >
                  Reset
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                Try Again
              </button>
            )}
          </div>

          {/* Score banner (visible when submitted and feedback modal closed) */}
          {submitted && !showFeedback && score !== null && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowFeedback(true)}
                className="text-sm text-green-600 hover:text-green-700 underline underline-offset-2"
              >
                Score: {score}% — View details
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drag overlay for smooth visual feedback */}
      <DragOverlay dropAnimation={null}>
        {activeBankItem ? (
          <DraggableItem
            id={activeBankItem.id}
            label={activeBankItem.label}
            type={activeBankItem.type}
          />
        ) : null}
      </DragOverlay>

      {/* Feedback modal */}
      {showFeedback && score !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <BuilderFeedback
            score={score}
            onReset={handleReset}
            onClose={() => setShowFeedback(false)}
          />
        </div>
      )}
    </DndContext>
  );
}
