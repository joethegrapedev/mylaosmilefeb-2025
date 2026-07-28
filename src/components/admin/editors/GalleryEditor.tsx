import { EditorShell } from '../ui/EditorShell';
import { TextField } from '../ui/Fields';
import { SectionCard } from '../ui/SectionCard';
import { ListEditor } from '../ui/ListEditor';
import { MediaItemInput } from '../ui/MediaItemInput';
import { galleryDefault } from '../../../content/defaults/gallery';
import { GalleryItem } from '../../../firebase/contentTypes';

const newItemId = () =>
  `gal-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

const createItem = (): GalleryItem => ({
  id: newItemId(),
  type: 'image',
  url: '',
});

const GalleryEditor = () => (
  <EditorShell section="gallery" title="Photo Gallery" fallback={galleryDefault}>
    {(editor) => (
      <>
        <SectionCard title="Heading">
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
          title="Photos & videos"
          description="Add photos (upload or URL) and YouTube videos to the gallery slider."
        >
          <ListEditor<GalleryItem>
            items={editor.data.items}
            onChange={(items) => editor.patch({ items })}
            renderItem={(item, update) => (
              <MediaItemInput item={item} section="gallery" onChange={update} />
            )}
            createItem={createItem}
            addLabel="Add photo or video"
            itemLabel={(item) => (item.type === 'youtube' ? 'Video' : 'Photo')}
            emptyLabel="No photos or videos yet."
          />
        </SectionCard>
      </>
    )}
  </EditorShell>
);

export default GalleryEditor;
