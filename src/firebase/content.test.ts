import { describe, it, expect, beforeEach, vi } from 'vitest';

// In-memory Firestore stand-in keyed by document id.
const store = new Map<string, any>();

function deepMerge(target: any, source: any): any {
  if (Array.isArray(source) || typeof source !== 'object' || source === null) return source;
  const out = { ...(target ?? {}) };
  for (const key of Object.keys(source)) {
    out[key] = deepMerge(target?.[key], source[key]);
  }
  return out;
}

vi.mock('./config', () => ({ db: {} }));

vi.mock('firebase/firestore', () => ({
  doc: (_db: unknown, _coll: string, id: string) => ({ id }),
  serverTimestamp: () => 'TS',
  getDoc: async (ref: { id: string }) => {
    const data = store.get(ref.id);
    return { exists: () => data !== undefined, data: () => data };
  },
  setDoc: async (ref: { id: string }, data: any, opts?: { merge?: boolean }) => {
    if (opts?.merge) store.set(ref.id, deepMerge(store.get(ref.id), data));
    else store.set(ref.id, data);
  },
}));

import {
  getPublished,
  getDraft,
  saveDraft,
  publish,
  discardDraft,
  getSectionState,
} from './content';

const fallback = { title: 'default', items: [] as any[] } as any;

beforeEach(() => store.clear());

describe('content service draft/publish', () => {
  it('getPublished returns fallback when empty', async () => {
    expect(await getPublished('statistics', fallback)).toEqual(fallback);
  });

  it('saveDraft then getDraft round-trips without touching published', async () => {
    const draft = { title: 'edited', items: [{ id: 'a', label: 'x', value: 1, order: 1 }] } as any;
    await saveDraft('statistics', draft);

    expect(await getDraft('statistics', fallback)).toEqual(draft);
    // Nothing published yet -> public read still gets fallback.
    expect(await getPublished('statistics', fallback)).toEqual(fallback);

    const state = await getSectionState('statistics');
    expect(state.hasDraft).toBe(true);
    expect(state.hasPublished).toBe(false);
    expect(state.hasUnpublishedChanges).toBe(true);
  });

  it('publish copies draft into published', async () => {
    const draft = { title: 'live', items: [] } as any;
    await saveDraft('statistics', draft);
    await publish('statistics');

    expect(await getPublished('statistics', fallback)).toEqual(draft);
    const state = await getSectionState('statistics');
    expect(state.hasUnpublishedChanges).toBe(false);
  });

  it('publish throws when there is no draft', async () => {
    await expect(publish('hero')).rejects.toThrow(/No draft/);
  });

  it('discardDraft reverts the draft to published', async () => {
    await saveDraft('statistics', { title: 'v1', items: [] } as any);
    await publish('statistics');
    await saveDraft('statistics', { title: 'v2-draft', items: [] } as any);

    expect((await getDraft('statistics', fallback)).title).toBe('v2-draft');
    await discardDraft('statistics');
    expect((await getDraft('statistics', fallback)).title).toBe('v1');
  });
});
