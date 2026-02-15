'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Pathway } from '@/data/types';
import StepNode from './StepNode';
import ReactionArrow from './ReactionArrow';
import StepDetailPanel from './StepDetailPanel';

interface InteractiveDiagramProps {
  pathway: Pathway;
  completed?: boolean;
  onComplete?: () => void;
}

export default function InteractiveDiagram({
  pathway,
  completed = false,
  onComplete,
}: InteractiveDiagramProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [visitedStepNumbers, setVisitedStepNumbers] = useState<Set<number>>(new Set());
  const completionTriggeredRef = useRef(false);

  const { steps, energySummary } = pathway;

  // Find current index in steps array for nav
  const currentIndex = selectedStep !== null
    ? steps.findIndex((s) => s.stepNumber === selectedStep)
    : -1;

  useEffect(() => {
    completionTriggeredRef.current = false;
  }, [pathway.id]);

  const markStepVisited = useCallback((stepNumber: number) => {
    setVisitedStepNumbers((prev) => {
      if (prev.has(stepNumber)) return prev;
      const next = new Set(prev);
      next.add(stepNumber);
      return next;
    });
  }, []);

  const handleStepClick = useCallback(
    (stepNumber: number) => {
      markStepVisited(stepNumber);
      setSelectedStep((prev) => (prev === stepNumber ? null : stepNumber));
    },
    [markStepVisited],
  );

  const handleClosePanel = useCallback(() => {
    setSelectedStep(null);
  }, []);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      const stepNumber = steps[currentIndex - 1].stepNumber;
      markStepVisited(stepNumber);
      setSelectedStep(stepNumber);
    }
  }, [currentIndex, markStepVisited, steps]);

  const goToNext = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      const stepNumber = steps[currentIndex + 1].stepNumber;
      markStepVisited(stepNumber);
      setSelectedStep(stepNumber);
    } else {
      // At last step, close panel
      setSelectedStep(null);
    }
  }, [currentIndex, markStepVisited, steps]);

  const handleStartWalkthrough = useCallback(() => {
    if (steps.length === 0) return;
    const stepNumber = steps[0].stepNumber;
    markStepVisited(stepNumber);
    setSelectedStep(stepNumber);
  }, [markStepVisited, steps]);

  const selectedStepData = selectedStep !== null
    ? steps.find((s) => s.stepNumber === selectedStep) ?? null
    : null;

  useEffect(() => {
    if (!onComplete || completed || completionTriggeredRef.current) return;
    if (steps.length === 0) return;

    if (visitedStepNumbers.size >= steps.length) {
      completionTriggeredRef.current = true;
      onComplete();
    }
  }, [completed, onComplete, steps.length, visitedStepNumbers.size]);

  return (
    <div className="relative">
      {/* ---- Pathway header ---- */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-900">{pathway.name}</h2>
        <p className="text-sm text-green-600/80 mt-1 max-w-xl mx-auto leading-relaxed">
          {pathway.netEquation}
        </p>
        <p className="text-xs text-green-500 mt-1">{pathway.location}</p>
      </div>

      {/* ---- Walk-through button ---- */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <button
            onClick={handleStartWalkthrough}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-green-100 text-green-700 hover:bg-green-200"
          >
            Step Through Pathway
          </button>
          <p className="mt-2 text-xs text-green-600/80">
            {completed
              ? 'Diagram complete'
              : `${visitedStepNumbers.size} / ${steps.length} steps reviewed`}
          </p>
        </div>
      </div>

      {/* ---- Step list ---- */}
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Phase label when phase changes */}
            {step.phaseName &&
              (i === 0 || steps[i - 1].phaseName !== step.phaseName) && (
                <div className="mb-2 mt-4 first:mt-0">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider">
                    {step.phaseName}
                  </span>
                </div>
              )}

            {/* Substrate intermediate label BEFORE the step */}
            {i === 0 && step.substrates.length > 0 && (
              <div className="mb-2">
                <IntermediateLabel
                  molecules={step.substrates}
                  isStarting
                />
              </div>
            )}

            <StepNode
              step={step}
              isSelected={selectedStep === step.stepNumber}
              onClick={() => handleStepClick(step.stepNumber)}
            />

            {/* Arrow + product intermediate between steps */}
            {i < steps.length - 1 && (
              <>
                <ReactionArrow
                  cofactorsConsumed={step.cofactorsConsumed}
                  cofactorsProduced={step.cofactorsProduced}
                />
                {/* Intermediate = products of this step / substrates of next */}
                <IntermediateLabel molecules={step.products} />
              </>
            )}

            {/* Final product after last step */}
            {i === steps.length - 1 && step.products.length > 0 && (
              <>
                <ReactionArrow
                  cofactorsConsumed={[]}
                  cofactorsProduced={[]}
                />
                <IntermediateLabel molecules={step.products} isFinal />
              </>
            )}
          </div>
        ))}
      </div>

      {/* ---- Energy summary ---- */}
      <div className="mt-8 mx-auto max-w-sm bg-white border border-green-200 rounded-xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-green-500 mb-3 text-center">
          Energy Summary
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <SummaryRow label="ATP consumed" value={energySummary.atpConsumed} />
          <SummaryRow label="ATP produced" value={energySummary.atpProduced} />
          {energySummary.gtpProduced !== undefined && energySummary.gtpProduced > 0 && (
            <SummaryRow label="GTP produced" value={energySummary.gtpProduced} />
          )}
          {energySummary.nadphConsumed !== undefined && energySummary.nadphConsumed > 0 && (
            <SummaryRow label="NADPH consumed" value={energySummary.nadphConsumed} />
          )}
          <SummaryRow label="NADH produced" value={energySummary.nadhProduced} />
          <SummaryRow label="FADH2 produced" value={energySummary.fadh2Produced} />
          {energySummary.co2Produced !== undefined && energySummary.co2Produced > 0 && (
            <SummaryRow label="CO2 produced" value={energySummary.co2Produced} />
          )}
          <div className="col-span-2 border-t border-green-100 pt-2 mt-1 flex justify-between">
            <span className="font-semibold text-green-800">Net ATP</span>
            <span className="font-bold text-green-700">{energySummary.netAtp}</span>
          </div>
        </div>
      </div>

      {/* ---- Detail panel (slide-in) ---- */}
      <AnimatePresence>
        {selectedStepData && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={handleClosePanel}
            />
            <StepDetailPanel
              step={selectedStepData}
              onClose={handleClosePanel}
              onPrev={currentIndex > 0 ? goToPrev : undefined}
              onNext={currentIndex < steps.length - 1 ? goToNext : undefined}
              currentIndex={currentIndex}
              totalSteps={steps.length}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <>
      <span className="text-green-700">{label}</span>
      <span className="text-right font-medium text-green-800">{value}</span>
    </>
  );
}

function IntermediateLabel({
  molecules,
  isStarting,
  isFinal,
}: {
  molecules: { name: string; abbreviation: string }[];
  isStarting?: boolean;
  isFinal?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 my-1">
      {(isStarting || isFinal) && (
        <span className="text-[9px] font-semibold uppercase tracking-wider text-green-400 mr-1">
          {isStarting ? 'Start' : 'End'}
        </span>
      )}
      {molecules.map((m, i) => (
        <span key={m.name + i}>
          <span
            className={`
              inline-block px-2.5 py-1 rounded-lg text-xs font-semibold border
              ${isFinal
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : isStarting
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-white text-green-800 border-green-300 shadow-sm'
              }
            `}
            title={m.name}
          >
            {m.abbreviation || m.name}
          </span>
          {i < molecules.length - 1 && (
            <span className="text-green-400 mx-0.5 text-xs">+</span>
          )}
        </span>
      ))}
    </div>
  );
}
