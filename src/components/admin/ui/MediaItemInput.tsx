import React from 'react';
import { GalleryItem } from '../../../firebase/contentTypes';
import { isValidYouTubeUrl, youtubeThumb } from '../../../utils/youtube';
import { ImageInput } from './ImageInput';

interface MediaItemInputProps {
  item: GalleryItem;
  onChange: (next: GalleryItem) => void;
  section: string;
}

/**
 * Editor for a single gallery item: a photo (upload or URL) OR a YouTube video
 * (URL). Toggling type keeps the row but swaps the input + preview.
 */
export const MediaItemInput: React.FC<MediaItemInputProps> = ({ item, onChange, section }) => {
  const setType = (type: GalleryItem['type']) => onChange({ ...item, type, url: '' });

  const ytValid = item.type === 'youtube' && item.url !== '' && isValidYouTubeUrl(item.url);

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-md border border-gray-300 overflow-hidden text-sm">
        <button
          type="button"
          onClick={() => setType('image')}
          className={`px-3 py-1.5 ${
            item.type === 'image' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
          }`}
        >
          Photo
        </button>
        <button
          type="button"
          onClick={() => setType('youtube')}
          className={`px-3 py-1.5 ${
            item.type === 'youtube' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
          }`}
        >
          YouTube video
        </button>
      </div>

      {item.type === 'image' ? (
        <ImageInput
          section={section}
          value={item.url}
          onChange={(url) => onChange({ ...item, url })}
        />
      ) : (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-40 h-24 shrink-0 rounded-md border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
            {ytValid ? (
              <img src={youtubeThumb(item.url)} alt="video preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400 px-2 text-center">YouTube preview</span>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <input
              type="url"
              value={item.url}
              placeholder="https://www.youtube.com/watch?v=… or https://youtu.be/…"
              onChange={(e) => onChange({ ...item, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {item.url !== '' && !ytValid && (
              <p className="text-xs text-red-600">Not a recognizable YouTube URL.</p>
            )}
          </div>
        </div>
      )}

      <input
        type="text"
        value={item.caption ?? ''}
        placeholder="Caption (optional)"
        onChange={(e) => onChange({ ...item, caption: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};
