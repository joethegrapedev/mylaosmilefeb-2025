import React, { useRef, useState } from 'react';
import { uploadSiteImage } from '../../../firebase/media';
import { FieldWrap } from './Fields';

interface ImageInputProps {
  label?: string;
  hint?: string;
  /** Current image URL (Storage download URL or external). */
  value: string;
  onChange: (url: string) => void;
  /** Section key used to namespace the Storage upload path. */
  section: string;
}

/**
 * Image picker supporting BOTH file upload to Firebase Storage AND pasting an
 * external image URL, with a live preview. Used for hero image, team photos,
 * gallery images, logo, etc.
 */
export const ImageInput: React.FC<ImageInputProps> = ({
  label,
  hint,
  value,
  onChange,
  section,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadSiteImage(file, section);
      onChange(url);
    } catch (e: any) {
      setError(e?.message ?? 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <FieldWrap label={label} hint={hint}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-28 h-28 shrink-0 rounded-md border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image</span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Upload image'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Remove
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" /> or paste a URL{' '}
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <input
            type="url"
            value={value}
            placeholder="https://example.com/photo.jpg"
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </FieldWrap>
  );
};
