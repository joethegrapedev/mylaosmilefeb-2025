import { describe, it, expect } from 'vitest';
import {
  parseYouTubeId,
  isValidYouTubeUrl,
  youtubeEmbedUrl,
  youtubeThumb,
} from './youtube';

const ID = 'dQw4w9WgXcQ';

describe('parseYouTubeId', () => {
  it('parses standard watch URLs', () => {
    expect(parseYouTubeId(`https://www.youtube.com/watch?v=${ID}`)).toBe(ID);
    expect(parseYouTubeId(`https://youtube.com/watch?v=${ID}&t=30s`)).toBe(ID);
  });

  it('parses youtu.be short URLs', () => {
    expect(parseYouTubeId(`https://youtu.be/${ID}`)).toBe(ID);
    expect(parseYouTubeId(`https://youtu.be/${ID}?si=abc`)).toBe(ID);
  });

  it('parses embed and shorts URLs', () => {
    expect(parseYouTubeId(`https://www.youtube.com/embed/${ID}`)).toBe(ID);
    expect(parseYouTubeId(`https://www.youtube.com/shorts/${ID}`)).toBe(ID);
  });

  it('accepts a bare 11-char id', () => {
    expect(parseYouTubeId(ID)).toBe(ID);
  });

  it('rejects non-YouTube or malformed input', () => {
    expect(parseYouTubeId('https://vimeo.com/12345')).toBeNull();
    expect(parseYouTubeId('not a url')).toBeNull();
    expect(parseYouTubeId('')).toBeNull();
    expect(parseYouTubeId('https://www.youtube.com/watch?v=short')).toBeNull();
  });
});

describe('helpers', () => {
  it('isValidYouTubeUrl reflects parse result', () => {
    expect(isValidYouTubeUrl(`https://youtu.be/${ID}`)).toBe(true);
    expect(isValidYouTubeUrl('https://example.com')).toBe(false);
  });

  it('builds embed and thumbnail URLs', () => {
    expect(youtubeEmbedUrl(`https://youtu.be/${ID}`)).toBe(`https://www.youtube.com/embed/${ID}`);
    expect(youtubeThumb(`https://youtu.be/${ID}`)).toBe(`https://img.youtube.com/vi/${ID}/hqdefault.jpg`);
    expect(youtubeEmbedUrl('bad')).toBe('');
  });
});
