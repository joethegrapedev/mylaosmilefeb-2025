import React, { useState } from 'react';
import { EditorShell } from '../ui/EditorShell';
import { SectionCard } from '../ui/SectionCard';
import { ListEditor } from '../ui/ListEditor';
import { TextField, TextArea, NumberField } from '../ui/Fields';
import { missionsDefault } from '../../../content/defaults/missions';
import { MissionItem } from '../../../firebase/contentTypes';
import { uploadMissionFile } from '../../../firebase/missions';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

const newId = () =>
  `mission-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

interface MissionRowProps {
  item: MissionItem;
  update: (next: MissionItem) => void;
}

/**
 * Row body for a single mission. Kept as its own component so it can hold the
 * async upload's local `uploading` / `error` state independently of siblings.
 */
const MissionRow: React.FC<MissionRowProps> = ({ item, update }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Allow re-selecting the same file later.
    event.target.value = '';
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploadError('File must be 10MB or smaller.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      const { url, fileName, storageFileName } = await uploadMissionFile(
        file,
        item.id
      );
      update({
        ...item,
        reportUrl: url,
        reportFileName: fileName,
        storageFileName,
      });
    } catch (err: any) {
      setUploadError(err?.message ?? 'Failed to upload report.');
    } finally {
      setUploading(false);
    }
  };

  const removeReport = () => {
    setUploadError(null);
    update({
      ...item,
      reportUrl: undefined,
      reportFileName: undefined,
      storageFileName: undefined,
    });
  };

  return (
    <div className="space-y-3">
      <TextField
        label="Title"
        hint="Include a month + year (e.g. February 2025) — the timeline sorts by it."
        value={item.title}
        onChange={(title) => update({ ...item, title })}
      />
      <TextArea
        label="Description"
        value={item.description}
        onChange={(description) => update({ ...item, description })}
        rows={2}
      />
      <NumberField
        label="Order"
        value={item.order}
        onChange={(order) => update({ ...item, order })}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Report (PDF)
        </label>

        {item.reportUrl ? (
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={item.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800 underline break-all"
            >
              {item.reportFileName ?? 'View report'}
            </a>
            <button
              type="button"
              onClick={removeReport}
              className="px-2 py-1 text-sm text-red-500 hover:text-red-700"
            >
              Remove report
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            disabled={uploading}
            className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:text-sm file:text-gray-700 hover:file:border-indigo-400 disabled:opacity-50"
          />
        )}

        {uploading && (
          <p className="text-xs text-gray-500">Uploading report…</p>
        )}
        {uploadError && (
          <p className="text-xs text-red-600">{uploadError}</p>
        )}
      </div>
    </div>
  );
};

const MissionsEditor: React.FC = () => (
  <EditorShell section="missions" title="Missions" fallback={missionsDefault}>
    {(editor) => (
      <>
        <SectionCard title="Heading">
          <TextField
            label="Title"
            value={editor.data.title}
            onChange={(title) => editor.patch({ title })}
          />
          <TextField
            label="Description"
            value={editor.data.des}
            onChange={(des) => editor.patch({ des })}
          />
          <TextField
            label="Timeline heading"
            value={editor.data.timelineHeading}
            onChange={(timelineHeading) => editor.patch({ timelineHeading })}
          />
        </SectionCard>

        <SectionCard
          title="Missions"
          description="Each mission appears as a card on the timeline, optionally with a PDF report."
        >
          <ListEditor<MissionItem>
            items={editor.data.items}
            onChange={(items) => editor.patch({ items })}
            addLabel="Add mission"
            itemLabel={(item, index) => item.title || `Mission ${index + 1}`}
            emptyLabel="No missions yet."
            createItem={() => ({
              id: newId(),
              title: '',
              description: '',
              order: editor.data.items.length + 1,
            })}
            renderItem={(item, update) => (
              <MissionRow item={item} update={update} />
            )}
          />
        </SectionCard>
      </>
    )}
  </EditorShell>
);

export default MissionsEditor;
