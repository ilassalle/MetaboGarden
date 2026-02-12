'use client';

import { useDraggable } from '@dnd-kit/core';

export type ItemType = 'enzyme' | 'substrate' | 'product';

interface DraggableItemProps {
  id: string;
  label: string;
  type: ItemType;
  disabled?: boolean;
}

const typeStyles: Record<ItemType, { bg: string; border: string; text: string; ring: string }> = {
  enzyme: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-800',
    ring: 'ring-green-400',
  },
  substrate: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-800',
    ring: 'ring-amber-400',
  },
  product: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-800',
    ring: 'ring-blue-400',
  },
};

const typeLabels: Record<ItemType, string> = {
  enzyme: 'E',
  substrate: 'S',
  product: 'P',
};

export default function DraggableItem({ id, label, type, disabled = false }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type, label },
    disabled,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const colors = typeStyles[type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium
        select-none transition-all duration-150
        ${colors.bg} ${colors.border} ${colors.text}
        ${disabled
          ? 'opacity-35 cursor-default'
          : 'cursor-grab hover:shadow-md active:cursor-grabbing hover:ring-2 ' + colors.ring
        }
        ${isDragging ? 'opacity-50 shadow-lg ring-2 ' + colors.ring : ''}
      `}
    >
      <span
        className={`
          w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center
          ${type === 'enzyme' ? 'bg-green-200 text-green-700' : ''}
          ${type === 'substrate' ? 'bg-amber-200 text-amber-700' : ''}
          ${type === 'product' ? 'bg-blue-200 text-blue-700' : ''}
        `}
      >
        {typeLabels[type]}
      </span>
      <span className="whitespace-normal break-words">{label}</span>
    </div>
  );
}
