import React from 'react';
import { EditorShell } from '../ui/EditorShell';
import { TextField, TextArea } from '../ui/Fields';
import { SectionCard } from '../ui/SectionCard';
import { ImageInput } from '../ui/ImageInput';
import { heroDefault } from '../../../content/defaults/hero';

// Section editor for the landing hero: headline, intro copy, image and the
// social links rendered in the public Banner.
const HeroEditor: React.FC = () => (
  <EditorShell
    section="hero"
    title="Hero"
    description="Landing headline, intro and social links"
    fallback={heroDefault}
  >
    {(editor) => (
      <>
        <SectionCard title="Headline">
          <TextField
            label="Heading"
            hint='Leading text before the highlighted name, e.g. "Hi, we are".'
            value={editor.data.heading}
            onChange={(v) => editor.patch({ heading: v })}
            placeholder="Hi, we are"
          />
          <TextField
            label="Highlighted name"
            hint="Shown in the accent colour after the heading."
            value={editor.data.highlightedName}
            onChange={(v) => editor.patch({ highlightedName: v })}
            placeholder="MyLaoSmile"
          />
          <TextField
            label="Subtitle"
            value={editor.data.subtitle}
            onChange={(v) => editor.patch({ subtitle: v })}
            placeholder="a non-profit organization aimed at spreading Smiles."
          />
          <TextArea
            label="Paragraph"
            value={editor.data.paragraph}
            onChange={(v) => editor.patch({ paragraph: v })}
            rows={5}
          />
        </SectionCard>

        <SectionCard title="Image">
          <ImageInput
            section="hero"
            label="Hero image"
            value={editor.data.image}
            onChange={(url) => editor.patch({ image: url })}
          />
        </SectionCard>

        <SectionCard title="Social links">
          <TextField
            label="Find us heading"
            value={editor.data.findUsHeading}
            onChange={(v) => editor.patch({ findUsHeading: v })}
            placeholder="Find us at"
          />
          <TextField
            label="YouTube URL"
            type="url"
            value={editor.data.social.youtube}
            onChange={(v) =>
              editor.patch({ social: { ...editor.data.social, youtube: v } })
            }
            placeholder="https://youtu.be/..."
          />
          <TextField
            label="Instagram URL"
            type="url"
            value={editor.data.social.instagram}
            onChange={(v) =>
              editor.patch({ social: { ...editor.data.social, instagram: v } })
            }
            placeholder="https://www.instagram.com/..."
          />
          <TextField
            label="Facebook URL"
            type="url"
            value={editor.data.social.facebook}
            onChange={(v) =>
              editor.patch({ social: { ...editor.data.social, facebook: v } })
            }
            placeholder="https://www.facebook.com/..."
          />
        </SectionCard>
      </>
    )}
  </EditorShell>
);

export default HeroEditor;
