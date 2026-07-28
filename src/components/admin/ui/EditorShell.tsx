import React from 'react';
import { SectionKey, ContentMap } from '../../../firebase/contentTypes';
import { useSectionEditor, SectionEditor } from './useSectionEditor';
import { PublishBar } from './PublishBar';

interface EditorShellProps<K extends SectionKey> {
  section: K;
  title: string;
  description?: string;
  fallback: ContentMap[K];
  /** Render the form body; receives the full section editor API. */
  children: (editor: SectionEditor<K>) => React.ReactNode;
}

/**
 * Wraps a section editor with the draft-loading lifecycle and the PublishBar.
 * A section editor only needs to render form controls bound to `editor.data`
 * and call `editor.patch(...)` / `editor.setData(...)` on change.
 */
export function EditorShell<K extends SectionKey>({
  section,
  title,
  description,
  fallback,
  children,
}: EditorShellProps<K>) {
  const editor = useSectionEditor(section, fallback);

  return (
    <div>
      <PublishBar
        title={title}
        description={description}
        dirty={editor.dirty}
        unpublished={editor.unpublished}
        saving={editor.saving}
        error={editor.error}
        success={editor.success}
        onSave={editor.save}
        onPublish={editor.publish}
        onDiscard={editor.discard}
      />

      {editor.loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mr-3" />
          Loading…
        </div>
      ) : (
        <div className="space-y-6 pb-16">{children(editor)}</div>
      )}
    </div>
  );
}
