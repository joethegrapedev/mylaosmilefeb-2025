import React from 'react';
import { EditorShell } from '../ui/EditorShell';
import { SectionCard } from '../ui/SectionCard';
import { TextField } from '../ui/Fields';
import { ImageInput } from '../ui/ImageInput';
import { ListEditor } from '../ui/ListEditor';
import { NavLink } from '../../../firebase/contentTypes';
import { navbarDefault } from '../../../content/defaults/navbar';

const createNavLink = (): NavLink => ({
  id: `nav-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
  title: '',
  link: '',
});

const NavbarEditor: React.FC = () => (
  <EditorShell section="navbar" title="Navbar & Social" fallback={navbarDefault}>
    {(editor) => (
      <>
        <SectionCard title="Branding">
          <ImageInput
            section="navbar"
            label="Logo"
            value={editor.data.logo}
            onChange={(v) => editor.patch({ logo: v })}
          />
          <TextField
            label="Tagline"
            value={editor.data.tagline}
            onChange={(v) => editor.patch({ tagline: v })}
          />
        </SectionCard>

        <SectionCard
          title="Navigation links"
          description="Links shown in the header. Each link scrolls to a section on the page."
        >
          <ListEditor<NavLink>
            items={editor.data.links}
            onChange={(links) => editor.patch({ links })}
            createItem={createNavLink}
            addLabel="Add link"
            itemLabel={(item) => item.title || 'Untitled link'}
            renderItem={(item, update) => (
              <div className="space-y-3">
                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(title) => update({ ...item, title })}
                />
                <TextField
                  label="Link"
                  hint="scroll target id, e.g. home / features / projects / Resume / joinus / testimonial"
                  value={item.link}
                  onChange={(link) => update({ ...item, link })}
                />
              </div>
            )}
          />
        </SectionCard>

        <SectionCard title="Social links">
          <TextField
            label="YouTube"
            value={editor.data.social.youtube}
            onChange={(v) =>
              editor.patch({ social: { ...editor.data.social, youtube: v } })
            }
          />
          <TextField
            label="Instagram"
            value={editor.data.social.instagram}
            onChange={(v) =>
              editor.patch({ social: { ...editor.data.social, instagram: v } })
            }
          />
          <TextField
            label="Facebook"
            value={editor.data.social.facebook}
            onChange={(v) =>
              editor.patch({ social: { ...editor.data.social, facebook: v } })
            }
          />
        </SectionCard>
      </>
    )}
  </EditorShell>
);

export default NavbarEditor;
