// One-time seed / migration for the `siteContent` collection.
//
// - Seeds every section from the extracted defaults (draft + published).
// - Migrates any existing legacy `statistics` / `missions` collection data so
//   nothing is lost when those sections move into the unified content model.
// - Never overwrites a section that already has published content (idempotent).

import { collection, doc, getDoc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { CONTENT_COLLECTION } from './content';
import { SectionKey, ContentMap, StatisticItem, MissionItem } from './contentTypes';
import { contentDefaults } from '../content/defaults';

export interface SeedResult {
  seeded: SectionKey[];
  skipped: SectionKey[];
  error?: string;
}

async function sectionExists(section: SectionKey): Promise<boolean> {
  const snap = await getDoc(doc(db, CONTENT_COLLECTION, section));
  return snap.exists() && !!snap.data()?.published;
}

async function writeSection<K extends SectionKey>(section: K, data: ContentMap[K]): Promise<void> {
  await setDoc(doc(db, CONTENT_COLLECTION, section), {
    draft: data,
    published: data,
    updatedAt: serverTimestamp(),
  });
}

/** Pull legacy `statistics` collection into a StatisticsContent value. */
async function migrateStatistics(): Promise<ContentMap['statistics']> {
  const base = { ...contentDefaults.statistics };
  try {
    const snap = await getDocs(collection(db, 'statistics'));
    if (snap.empty) return base;
    const items: StatisticItem[] = snap.docs.map((d) => {
      const data = d.data() as Omit<StatisticItem, 'id'>;
      return { id: d.id, label: data.label, value: Number(data.value), order: Number(data.order) };
    });
    items.sort((a, b) => a.order - b.order);
    return { ...base, items };
  } catch (error) {
    console.warn('[seed] statistics migration failed, using defaults:', error);
    return base;
  }
}

/** Pull legacy `missions` collection into a MissionsContent value. */
async function migrateMissions(): Promise<ContentMap['missions']> {
  const base = { ...contentDefaults.missions };
  try {
    const snap = await getDocs(collection(db, 'missions'));
    if (snap.empty) return base;
    const items: MissionItem[] = snap.docs.map((d) => {
      const data = d.data() as Omit<MissionItem, 'id'>;
      return {
        id: d.id,
        title: data.title,
        description: data.description,
        order: Number(data.order ?? 0),
        reportUrl: data.reportUrl,
        reportFileName: data.reportFileName,
        storageFileName: data.storageFileName,
      };
    });
    items.sort((a, b) => a.order - b.order);
    return { ...base, items };
  } catch (error) {
    console.warn('[seed] missions migration failed, using defaults:', error);
    return base;
  }
}

/**
 * Seed all sections. Existing published sections are left untouched unless
 * `force` is true. Returns which sections were written vs skipped.
 */
export async function seedSiteContent(force = false): Promise<SeedResult> {
  const seeded: SectionKey[] = [];
  const skipped: SectionKey[] = [];
  const sections = Object.keys(contentDefaults) as SectionKey[];

  try {
    for (const section of sections) {
      if (!force && (await sectionExists(section))) {
        skipped.push(section);
        continue;
      }

      let data: ContentMap[SectionKey] = contentDefaults[section];
      if (section === 'statistics') data = await migrateStatistics();
      if (section === 'missions') data = await migrateMissions();

      await writeSection(section, data);
      seeded.push(section);
    }
    return { seeded, skipped };
  } catch (error: any) {
    console.error('[seed] seedSiteContent failed:', error);
    return { seeded, skipped, error: error?.message ?? 'Unknown error' };
  }
}
