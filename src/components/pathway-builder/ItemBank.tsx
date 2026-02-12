'use client';

import DraggableItem from './DraggableItem';
import type { ItemType } from './DraggableItem';

export interface BankItem {
  id: string;
  label: string;
  type: ItemType;
}

interface ItemBankProps {
  items: BankItem[];
  usedIds: Set<string>;
}

const sectionOrder: ItemType[] = ['enzyme', 'substrate', 'product'];

const sectionMeta: Record<ItemType, { heading: string; accent: string }> = {
  enzyme: { heading: 'Enzymes', accent: 'text-green-700' },
  substrate: { heading: 'Substrates', accent: 'text-amber-700' },
  product: { heading: 'Products', accent: 'text-blue-700' },
};

export default function ItemBank({ items, usedIds }: ItemBankProps) {
  const grouped = sectionOrder.reduce<Record<ItemType, BankItem[]>>(
    (acc, type) => {
      acc[type] = items.filter((item) => item.type === type);
      return acc;
    },
    { enzyme: [], substrate: [], product: [] },
  );

  return (
    <div className="bg-white rounded-2xl border border-green-200 p-4 space-y-4">
      <h3 className="text-sm font-semibold text-green-900 tracking-wide uppercase">
        Available Items
      </h3>

      {sectionOrder.map((type) => {
        const group = grouped[type];
        if (group.length === 0) return null;

        const { heading, accent } = sectionMeta[type];

        return (
          <div key={type}>
            <h4 className={`text-xs font-semibold ${accent} mb-2`}>{heading}</h4>
            <div className="flex flex-wrap gap-2">
              {group.map((item) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  type={item.type}
                  disabled={usedIds.has(item.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <p className="text-sm text-green-500 italic">No items available</p>
      )}
    </div>
  );
}
