import React from 'react';
import { Alert } from './Alert';

interface PublishBarProps {
  title: string;
  description?: string;
  dirty: boolean;
  unpublished: boolean;
  saving: boolean;
  error: string | null;
  success: string | null;
  onSave: () => void;
  onPublish: () => void;
  onDiscard: () => void;
}

/**
 * Sticky header for a section editor: shows the section title, its draft /
 * published state, and the Save draft / Publish / Discard controls.
 */
export const PublishBar: React.FC<PublishBarProps> = ({
  title,
  description,
  dirty,
  unpublished,
  saving,
  error,
  success,
  onSave,
  onPublish,
  onDiscard,
}) => {
  let badge: { text: string; cls: string };
  if (dirty) badge = { text: 'Unsaved changes', cls: 'bg-amber-100 text-amber-800' };
  else if (unpublished) badge = { text: 'Draft not published', cls: 'bg-blue-100 text-blue-800' };
  else badge = { text: 'Published', cls: 'bg-green-100 text-green-800' };

  return (
    <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur border-b border-gray-200 -mx-6 px-6 py-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
              {badge.text}
            </span>
          </div>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDiscard}
            disabled={saving || !unpublished}
            className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 disabled:opacity-40"
          >
            Discard draft
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || !dirty}
            className="px-4 py-2 text-sm font-medium rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          <button
            type="button"
            onClick={onPublish}
            disabled={saving || (!dirty && !unpublished)}
            className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40"
          >
            {saving ? 'Working…' : 'Publish'}
          </button>
        </div>
      </div>

      {(error || success) && (
        <div className="mt-3">
          {error && <Alert kind="error">{error}</Alert>}
          {!error && success && <Alert kind="success">{success}</Alert>}
        </div>
      )}
    </div>
  );
};
