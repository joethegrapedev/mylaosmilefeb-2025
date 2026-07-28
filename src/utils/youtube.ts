// Helpers for handling YouTube URLs entered in the admin (e.g. gallery videos,
// the story video). Accepts the common URL forms and normalizes to an ID.

const YT_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'];

/**
 * Extract the 11-character video ID from any common YouTube URL form:
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 * - https://www.youtube.com/shorts/ID
 * Returns null if the string is not a recognizable YouTube URL.
 */
export function parseYouTubeId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  // Bare ID passed directly.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  if (!YT_HOSTS.includes(url.hostname) && !YT_HOSTS.includes(host)) return null;

  // youtu.be/ID
  if (host === 'youtu.be') {
    const id = url.pathname.slice(1).split('/')[0];
    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  }

  // youtube.com/watch?v=ID
  const v = url.searchParams.get('v');
  if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

  // youtube.com/embed/ID or /shorts/ID
  const parts = url.pathname.split('/').filter(Boolean);
  if ((parts[0] === 'embed' || parts[0] === 'shorts') && parts[1]) {
    const id = parts[1];
    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  }

  return null;
}

/** True if the string is a usable YouTube URL / ID. */
export function isValidYouTubeUrl(input: string): boolean {
  return parseYouTubeId(input) !== null;
}

/** Build an embeddable iframe URL from any accepted YouTube URL form. */
export function youtubeEmbedUrl(input: string): string {
  const id = parseYouTubeId(input);
  return id ? `https://www.youtube.com/embed/${id}` : '';
}

/** Thumbnail URL for a YouTube video (used for gallery previews). */
export function youtubeThumb(input: string, quality: 'hq' | 'mq' | 'max' = 'hq'): string {
  const id = parseYouTubeId(input);
  if (!id) return '';
  const file =
    quality === 'max' ? 'maxresdefault' : quality === 'mq' ? 'mqdefault' : 'hqdefault';
  return `https://img.youtube.com/vi/${id}/${file}.jpg`;
}
