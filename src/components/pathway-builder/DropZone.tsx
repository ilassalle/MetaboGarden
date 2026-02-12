'use client';

import { useDroppable } from '@dnd-kit/core';
import type { ItemType } from './DraggableItem';

interface DropZoneProps {
  id: string;
  acceptType: ItemType;
  currentItem?: string;
  isCorrect?: boolean | null;
  onRemove?: () => void;
}

const placeholderStyles: Record<ItemType, { border: string; text: string; bg: string }> = {
  enzyme: {
    border: 'border-green-300',
    text: 'text-green-400',
    bg: 'bg-green-50/50',
  },
  substrate: {
    border: 'border-amber-300',
    text: 'text-amber-400',
    bg: 'bg-amber-50/50',
  },
  product: {
    border: 'border-blue-300',
    text: 'text-blue-400',
    bg: 'bg-blue-50/50',
  },
};

const filledStyles: Record<ItemType, { bg: string; text: string; border: string }> = {
  enzyme: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' },
  substrate: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-400' },
  product: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' },
};

const typeLabels: Record<ItemType, string> = {
  enzyme: 'Enzyme',
  substrate: 'Substrate',
  product: 'Product',
};

export default function DropZone({
  id,
  acceptType,
  currentItem,
  isCorrect,
  onRemove,
}: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { acceptType },
  });

  const isEmpty = !currentItem;
  const placeholder = placeholderStyles[acceptType];
  const filled = filledStyles[acceptType];

  // Determine border color based on validation state
  let validationBorder = '';
  let validationIcon = null;
  if (isCorrect === true) {
    validationBorder = 'border-green-500 ring-2 ring-green-200';
    validationIcon = (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (isCorrect === false) {
    validationBorder = 'border-red-500 ring-2 ring-red-200';
    validationIcon = (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`
        relative min-h-[42px] rounded-lg border-2 border-dashed px-3 py-2
        transition-all duration-150 flex items-center
        ${isEmpty
          ? `${placeholder.border} ${placeholder.bg} ${isOver ? 'border-solid scale-[1.02] shadow-sm' : ''}`
          : `${filled.bg} ${filled.border} border-solid`
        }
        ${validationBorder}
      `}
    >
      {isEmpty ? (
        <span className={`text-xs ${placeholder.text} select-none`}>
          {typeLabels[acceptType]}
        </span>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <span className={`text-sm font-medium ${filled.text} flex-1 break-words`}>
            {currentItem}
          </span>

          {validationIcon}

          {onRemove && isCorrect === undefined && (
            <button
              type="button"
              onClick={onRemove}
              className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label={`Remove ${currentItem}`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Hover overlay label when dragging over */}
      {isOver && isEmpty && (
        <div className="absolute inset-0 rounded-lg bg-green-100/40 pointer-events-none" />
      )}
    </div>
  );
}
