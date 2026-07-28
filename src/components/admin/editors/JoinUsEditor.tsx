import React from 'react';
import { EditorShell } from '../ui/EditorShell';
import { SectionCard } from '../ui/SectionCard';
import { TextField, UrlField } from '../ui/Fields';
import { ListEditor, StringListEditor } from '../ui/ListEditor';
import { joinUsDefault } from '../../../content/defaults/joinus';
import { SeekingCard } from '../../../firebase/contentTypes';

const newCardId = (): string =>
  `card-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

const JoinUsEditor: React.FC = () => (
  <EditorShell section="joinus" title="Join Us" fallback={joinUsDefault}>
    {(editor) => (
      <>
        <SectionCard title="Heading" description="Section title and subtitle.">
          <TextField
            label="Title"
            value={editor.data.title}
            onChange={(title) => editor.patch({ title })}
          />
          <TextField
            label="Subtitle"
            value={editor.data.des}
            onChange={(des) => editor.patch({ des })}
          />
        </SectionCard>

        <SectionCard
          title="Introduction"
          description="Intro paragraphs shown above the roles."
        >
          <StringListEditor
            items={editor.data.paragraphs}
            onChange={(paragraphs) => editor.patch({ paragraphs })}
            addLabel="Add paragraph"
            placeholder="Paragraph text"
          />
        </SectionCard>

        <SectionCard
          title="Roles"
          description="The roles the team is seeking, grouped into cards."
        >
          <TextField
            label="Seeking heading"
            value={editor.data.seekingHeading}
            onChange={(seekingHeading) => editor.patch({ seekingHeading })}
          />

          <ListEditor<SeekingCard>
            items={editor.data.cards}
            onChange={(cards) => editor.patch({ cards })}
            addLabel="Add card"
            itemLabel={(card) => card.heading || 'Untitled card'}
            createItem={() => ({ id: newCardId(), heading: '', items: [] })}
            renderItem={(card, update) => (
              <div className="space-y-3">
                <TextField
                  label="Heading"
                  value={card.heading}
                  onChange={(heading) => update({ ...card, heading })}
                />
                <StringListEditor
                  items={card.items}
                  onChange={(items) => update({ ...card, items })}
                  addLabel="Add item"
                  placeholder="Role / requirement"
                />
              </div>
            )}
          />
        </SectionCard>

        <SectionCard
          title="Call to action"
          description="The apply button label and destination."
        >
          <TextField
            label="Button label"
            value={editor.data.ctaLabel}
            onChange={(ctaLabel) => editor.patch({ ctaLabel })}
          />
          <UrlField
            label="Button URL"
            value={editor.data.ctaUrl}
            onChange={(ctaUrl) => editor.patch({ ctaUrl })}
          />
        </SectionCard>
      </>
    )}
  </EditorShell>
);

export default JoinUsEditor;
