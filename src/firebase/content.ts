// Generic draft/publish content service backing the admin CMS.
//
// Firestore layout: collection `siteContent`, one document per section key.
// Each document: { draft: <SectionData>, published: <SectionData>, updatedAt }.
//
// Public components read `published` (falling back to the extracted defaults
// when the DB is empty). Admin editors read/write `draft` and call publish()
// to copy draft -> published.
//
// Note on merge:true — the content schema has stable object keys and uses
// arrays for all variable-length lists. Firestore replaces arrays wholesale on
// merge and deep-merges objects, so merge:true is safe here (no stale subkeys).

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { SectionKey, ContentMap } from './contentTypes';

export const CONTENT_COLLECTION = 'siteContent';

interface SectionDoc<T> {
  draft?: T;
  published?: T;
}

async function readSection<K extends SectionKey>(
  section: K
): Promise<SectionDoc<ContentMap[K]> | null> {
  const snap = await getDoc(doc(db, CONTENT_COLLECTION, section));
  if (!snap.exists()) return null;
  return (snap.data() as SectionDoc<ContentMap[K]>) ?? null;
}

/** Public site read. Returns the published content, or `fallback` if absent. */
export async function getPublished<K extends SectionKey>(
  section: K,
  fallback: ContentMap[K]
): Promise<ContentMap[K]> {
  try {
    const data = await readSection(section);
    if (data?.published) return data.published;
    return fallback;
  } catch (error) {
    console.error(`[content] getPublished(${section}) failed:`, error);
    return fallback;
  }
}

/** Admin read. Prefers the draft, then published, then `fallback`. */
export async function getDraft<K extends SectionKey>(
  section: K,
  fallback: ContentMap[K]
): Promise<ContentMap[K]> {
  try {
    const data = await readSection(section);
    if (data?.draft) return data.draft;
    if (data?.published) return data.published;
    return fallback;
  } catch (error) {
    console.error(`[content] getDraft(${section}) failed:`, error);
    return fallback;
  }
}

/** Persist the working draft for a section. */
export async function saveDraft<K extends SectionKey>(
  section: K,
  data: ContentMap[K]
): Promise<void> {
  await setDoc(
    doc(db, CONTENT_COLLECTION, section),
    { draft: data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Copy the current draft into `published`, making it live. */
export async function publish<K extends SectionKey>(section: K): Promise<void> {
  const data = await readSection(section);
  if (!data?.draft) throw new Error(`No draft to publish for section "${section}"`);
  await setDoc(
    doc(db, CONTENT_COLLECTION, section),
    { published: data.draft, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Reset the draft back to the currently published content. */
export async function discardDraft<K extends SectionKey>(section: K): Promise<void> {
  const data = await readSection(section);
  if (data?.published) {
    await setDoc(
      doc(db, CONTENT_COLLECTION, section),
      { draft: data.published, updatedAt: serverTimestamp() },
      { merge: true }
    );
  }
}

export interface SectionState {
  exists: boolean;
  hasDraft: boolean;
  hasPublished: boolean;
  hasUnpublishedChanges: boolean;
}

/** Status used to drive the sidebar badges. */
export async function getSectionState(section: SectionKey): Promise<SectionState> {
  const empty: SectionState = {
    exists: false,
    hasDraft: false,
    hasPublished: false,
    hasUnpublishedChanges: false,
  };
  try {
    const data = await readSection(section);
    if (!data) return empty;
    const hasDraft = !!data.draft;
    const hasPublished = !!data.published;
    const hasUnpublishedChanges =
      hasDraft && JSON.stringify(data.draft) !== JSON.stringify(data.published);
    return { exists: true, hasDraft, hasPublished, hasUnpublishedChanges };
  } catch (error) {
    console.error(`[content] getSectionState(${section}) failed:`, error);
    return empty;
  }
}

/** Fetch state for many sections at once (sidebar load). */
export async function getAllSectionStates(
  sections: SectionKey[]
): Promise<Record<string, SectionState>> {
  const entries = await Promise.all(
    sections.map(async (s) => [s, await getSectionState(s)] as const)
  );
  return Object.fromEntries(entries);
}
