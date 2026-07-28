import { useCallback, useEffect, useState } from 'react';
import {
  getDraft,
  saveDraft,
  publish as publishSection,
  discardDraft,
  getSectionState,
} from '../../../firebase/content';
import { SectionKey, ContentMap } from '../../../firebase/contentTypes';
import { useAdminStatus } from './AdminStatusContext';

export interface SectionEditor<K extends SectionKey> {
  data: ContentMap[K];
  setData: (next: ContentMap[K]) => void;
  /** Shallow-merge a partial patch into the current data. */
  patch: (partial: Partial<ContentMap[K]>) => void;
  loading: boolean;
  saving: boolean;
  /** Local edits not yet saved to the draft. */
  dirty: boolean;
  /** Saved draft differs from published (i.e. there is something to publish). */
  unpublished: boolean;
  error: string | null;
  success: string | null;
  save: () => Promise<void>;
  publish: () => Promise<void>;
  discard: () => Promise<void>;
  reload: () => Promise<void>;
}

/**
 * Backbone hook for every section editor. Loads the section draft, tracks the
 * dirty/unpublished state, and exposes save / publish / discard wired to the
 * content service. Each editor just renders form controls bound to `data`.
 */
export function useSectionEditor<K extends SectionKey>(
  section: K,
  fallback: ContentMap[K]
): SectionEditor<K> {
  const { refresh } = useAdminStatus();
  const [data, setDataState] = useState<ContentMap[K]>(fallback);
  const [baseline, setBaseline] = useState<string>(''); // JSON of the loaded draft
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unpublished, setUnpublished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const draft = await getDraft(section, fallback);
      setDataState(draft);
      setBaseline(JSON.stringify(draft));
      const state = await getSectionState(section);
      setUnpublished(state.hasUnpublishedChanges);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load content');
    } finally {
      setLoading(false);
    }
    // fallback is a stable module default; intentionally excluded from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useEffect(() => {
    reload();
  }, [reload]);

  const setData = useCallback((next: ContentMap[K]) => {
    setDataState(next);
    setSuccess(null);
  }, []);

  const patch = useCallback((partial: Partial<ContentMap[K]>) => {
    setDataState((prev) => ({ ...prev, ...partial }));
    setSuccess(null);
  }, []);

  const dirty = JSON.stringify(data) !== baseline;

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await saveDraft(section, data);
      setBaseline(JSON.stringify(data));
      setUnpublished(true);
      setSuccess('Draft saved.');
      refresh();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save draft');
    } finally {
      setSaving(false);
    }
  }, [section, data, refresh]);

  const publish = useCallback(async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await saveDraft(section, data);
      setBaseline(JSON.stringify(data));
      await publishSection(section);
      setUnpublished(false);
      setSuccess('Published — the change is now live.');
      refresh();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to publish');
    } finally {
      setSaving(false);
    }
  }, [section, data, refresh]);

  const discard = useCallback(async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await discardDraft(section);
      await reload();
      setSuccess('Draft discarded — reverted to the published version.');
      refresh();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to discard draft');
    } finally {
      setSaving(false);
    }
  }, [section, reload, refresh]);

  return {
    data,
    setData,
    patch,
    loading,
    saving,
    dirty,
    unpublished,
    error,
    success,
    save,
    publish,
    discard,
    reload,
  };
}
