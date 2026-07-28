import React from 'react';

interface ListEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  /** Render the editable body of a single row. */
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  /** Factory for a new blank item when "Add" is clicked. */
  createItem: () => T;
  addLabel?: string;
  /** Optional per-row heading (e.g. "Surgeons", "Slide 2"). */
  itemLabel?: (item: T, index: number) => string;
  emptyLabel?: string;
}

/**
 * Generic add / remove / reorder editor for an array of items. Each editor
 * (roster groups, gallery items, nav links, seeking cards, name lists, …)
 * supplies how to render and create a row; the reordering/removal is shared.
 */
export function ListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  addLabel = 'Add item',
  itemLabel,
  emptyLabel = 'No items yet.',
}: ListEditorProps<T>) {
  const updateAt = (index: number, next: T) => {
    onChange(items.map((it, i) => (i === index ? next : it)));
  };

  const removeAt = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-gray-400">{emptyLabel}</p>}

      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              {itemLabel ? itemLabel(item, index) : `Item ${index + 1}`}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="px-2 py-1 text-gray-500 hover:text-gray-800 disabled:opacity-30"
                title="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="px-2 py-1 text-gray-500 hover:text-gray-800 disabled:opacity-30"
                title="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="px-2 py-1 text-red-500 hover:text-red-700"
                title="Remove"
              >
                ✕
              </button>
            </div>
          </div>
          {renderItem(item, (next) => updateAt(index, next), index)}
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, createItem()])}
        className="inline-flex items-center gap-1 px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
      >
        + {addLabel}
      </button>
    </div>
  );
}

/**
 * Convenience editor for a plain list of strings (e.g. team member names,
 * bullet items). Built on ListEditor.
 */
export const StringListEditor: React.FC<{
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  placeholder?: string;
}> = ({ items, onChange, addLabel = 'Add', placeholder = 'Enter value' }) => (
  <div className="space-y-2">
    {items.map((value, index) => (
      <div key={index} className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(items.map((v, i) => (i === index ? e.target.value : v)))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => onChange(items.filter((_, i) => i !== index))}
          className="px-2 py-1 text-red-500 hover:text-red-700"
          title="Remove"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => onChange([...items, ''])}
      className="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
    >
      + {addLabel}
    </button>
  </div>
);
