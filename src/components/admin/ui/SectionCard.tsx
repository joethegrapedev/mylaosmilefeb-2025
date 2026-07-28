import React from 'react';

// A titled white card used to group related fields inside an editor.
export const SectionCard: React.FC<{
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, actions, children }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
    {(title || actions) && (
      <div className="flex items-start justify-between gap-4">
        <div>
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
        {actions}
      </div>
    )}
    {children}
  </div>
);
