import React from 'react';
import { EditorShell } from '../ui/EditorShell';
import { SectionCard } from '../ui/SectionCard';
import { TextField, TextArea, UrlField } from '../ui/Fields';
import { ImageInput } from '../ui/ImageInput';
import { ListEditor, StringListEditor } from '../ui/ListEditor';
import { storyDefault } from '../../../content/defaults/story';
import { Leader, RosterGroup } from '../../../firebase/contentTypes';

// Generate a collision-resistant id without relying on Date.now().
const uid = (prefix: string): string =>
  `${prefix}-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

/**
 * Admin editor for the About / Our Story section. Renders controls for every
 * field of StoryContent and persists through the shared section-editor backbone.
 */
const StoryEditor: React.FC = () => (
  <EditorShell
    section="story"
    title="About / Our Story"
    fallback={storyDefault}
  >
    {(editor) => {
      const { data } = editor;

      return (
        <>
          <SectionCard
            title="Heading & Video"
            description="The section title and the introductory YouTube video."
          >
            <TextField
              label="Section title"
              value={data.title}
              onChange={(title) => editor.patch({ title })}
              placeholder="Our Story"
            />
            <UrlField
              label="Video URL"
              hint="Paste any YouTube URL (watch, youtu.be, embed, or shorts). It is normalized to an embeddable player."
              value={data.videoUrl}
              onChange={(videoUrl) => editor.patch({ videoUrl })}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </SectionCard>

          <SectionCard
            title="History"
            description="The written history shown beside the video."
          >
            <TextField
              label="History heading"
              value={data.historyHeading}
              onChange={(historyHeading) => editor.patch({ historyHeading })}
              placeholder="The History of MyLaoSmile"
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                History paragraphs
              </label>
              <StringListEditor
                items={data.historyParagraphs}
                onChange={(historyParagraphs) => editor.patch({ historyParagraphs })}
                addLabel="Add paragraph"
                placeholder="Enter a paragraph"
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Leaders"
            description="The featured leadership team cards."
          >
            <ListEditor<Leader>
              items={data.leaders}
              onChange={(leaders) => editor.patch({ leaders })}
              itemLabel={(leader, i) => leader.name || `Leader ${i + 1}`}
              addLabel="Add leader"
              createItem={() => ({ id: uid('leader'), name: '', role: '', image: '' })}
              renderItem={(leader, update) => (
                <div className="space-y-3">
                  <TextField
                    label="Name"
                    value={leader.name}
                    onChange={(name) => update({ ...leader, name })}
                    placeholder="Dr. Jane Doe"
                  />
                  <TextField
                    label="Role"
                    value={leader.role}
                    onChange={(role) => update({ ...leader, role })}
                    placeholder="Mission Leader"
                  />
                  <ImageInput
                    label="Photo"
                    section="story"
                    value={leader.image}
                    onChange={(image) => update({ ...leader, image })}
                  />
                </div>
              )}
            />
          </SectionCard>

          <SectionCard
            title="Contributors"
            description="Groups of contributors shown under 'Our Contributors'."
          >
            <ListEditor<RosterGroup>
              items={data.roster}
              onChange={(roster) => editor.patch({ roster })}
              itemLabel={(group, i) => group.role || `Group ${i + 1}`}
              addLabel="Add group"
              createItem={() => ({ id: uid('roster'), role: '', names: [] })}
              renderItem={(group, update) => (
                <div className="space-y-3">
                  <TextField
                    label="Role"
                    value={group.role}
                    onChange={(role) => update({ ...group, role })}
                    placeholder="Surgeons"
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Names
                    </label>
                    <StringListEditor
                      items={group.names}
                      onChange={(names) => update({ ...group, names })}
                      addLabel="Add name"
                      placeholder="Full name"
                    />
                  </div>
                </div>
              )}
            />
          </SectionCard>

          <SectionCard
            title="Acknowledgement"
            description="The closing message beneath the contributors."
          >
            <TextField
              label="Role"
              value={data.acknowledgement.role}
              onChange={(role) =>
                editor.patch({
                  acknowledgement: { ...data.acknowledgement, role },
                })
              }
              placeholder="Local partners"
            />
            <TextArea
              label="Message"
              value={data.acknowledgement.message}
              onChange={(message) =>
                editor.patch({
                  acknowledgement: { ...data.acknowledgement, message },
                })
              }
              placeholder="With gratitude to…"
            />
          </SectionCard>

          <SectionCard
            title="Foreword"
            description="The signed foreword and its author signature block."
          >
            <TextField
              label="Foreword heading"
              value={data.foreword.heading}
              onChange={(heading) =>
                editor.patch({ foreword: { ...data.foreword, heading } })
              }
              placeholder="Foreword"
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Foreword paragraphs
              </label>
              <StringListEditor
                items={data.foreword.paragraphs}
                onChange={(paragraphs) =>
                  editor.patch({ foreword: { ...data.foreword, paragraphs } })
                }
                addLabel="Add paragraph"
                placeholder="Enter a paragraph"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Signature lines
              </label>
              <StringListEditor
                items={data.foreword.signature}
                onChange={(signature) =>
                  editor.patch({ foreword: { ...data.foreword, signature } })
                }
                addLabel="Add signature line"
                placeholder="Name / title / department"
              />
            </div>
          </SectionCard>
        </>
      );
    }}
  </EditorShell>
);

export default StoryEditor;
