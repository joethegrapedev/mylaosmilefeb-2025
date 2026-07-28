import React from 'react';
import { EditorShell } from '../ui/EditorShell';
import { SectionCard } from '../ui/SectionCard';
import { ListEditor } from '../ui/ListEditor';
import { TextField, NumberField } from '../ui/Fields';
import { statisticsDefault } from '../../../content/defaults/statistics';
import { StatisticItem } from '../../../firebase/contentTypes';

const newId = () =>
  `stat-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

const StatisticsEditor: React.FC = () => (
  <EditorShell
    section="statistics"
    title="Statistics"
    fallback={statisticsDefault}
  >
    {(editor) => (
      <>
        <SectionCard title="Heading">
          <TextField
            label="Title"
            value={editor.data.title}
            onChange={(title) => editor.patch({ title })}
          />
        </SectionCard>

        <SectionCard
          title="Statistics"
          description="Each stat is shown as a big number with a label."
        >
          <ListEditor<StatisticItem>
            items={editor.data.items}
            onChange={(items) => editor.patch({ items })}
            addLabel="Add statistic"
            itemLabel={(item, index) => item.label || `Statistic ${index + 1}`}
            emptyLabel="No statistics yet."
            createItem={() => ({
              id: newId(),
              label: '',
              value: 0,
              order: editor.data.items.length + 1,
            })}
            renderItem={(item, update) => (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TextField
                  label="Label"
                  value={item.label}
                  onChange={(label) => update({ ...item, label })}
                />
                <NumberField
                  label="Value"
                  value={item.value}
                  onChange={(value) => update({ ...item, value })}
                />
                <NumberField
                  label="Order"
                  value={item.order}
                  onChange={(order) => update({ ...item, order })}
                />
              </div>
            )}
          />
        </SectionCard>
      </>
    )}
  </EditorShell>
);

export default StatisticsEditor;
