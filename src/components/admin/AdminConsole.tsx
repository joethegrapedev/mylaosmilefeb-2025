import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signOutAdmin } from '../../firebase/auth';
import { getAllSectionStates, SectionState } from '../../firebase/content';
import { seedSiteContent } from '../../firebase/seedContent';
import { SectionKey } from '../../firebase/contentTypes';
import { SECTIONS, getSection } from './sections';
import { AdminLayout } from './ui/AdminLayout';
import { AdminStatusContext } from './ui/AdminStatusContext';

const SECTION_KEYS = SECTIONS.map((s) => s.key);

const AdminConsole: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeKey, setActiveKey] = useState<SectionKey>(SECTIONS[0].key);
  const [statuses, setStatuses] = useState<Record<string, SectionState>>({});
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate('/admin/signin');
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const refreshStatuses = useCallback(async () => {
    try {
      setStatuses(await getAllSectionStates(SECTION_KEYS));
    } catch (e) {
      console.error('Failed to load section statuses', e);
    }
  }, []);

  useEffect(() => {
    if (user) refreshStatuses();
  }, [user, refreshStatuses]);

  const handleSignOut = async () => {
    const result = await signOutAdmin();
    if (result.success) navigate('/admin/signin');
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMessage(null);
    const result = await seedSiteContent();
    if (result.error) {
      setSeedMessage(`Seed failed: ${result.error}`);
    } else if (result.seeded.length === 0) {
      setSeedMessage('All sections already set up.');
    } else {
      setSeedMessage(`Seeded: ${result.seeded.join(', ')}.`);
    }
    await refreshStatuses();
    setSeeding(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  const active = getSection(activeKey);
  const Editor = active?.Editor;

  return (
    <AdminStatusContext.Provider value={{ refresh: refreshStatuses }}>
      <AdminLayout
        activeKey={activeKey}
        onSelect={setActiveKey}
        statuses={statuses}
        userEmail={user?.email}
        onSignOut={handleSignOut}
        onSeed={handleSeed}
        seeding={seeding}
        seedMessage={seedMessage}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16 text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mr-3" />
              Loading editor…
            </div>
          }
        >
          {Editor && <Editor key={activeKey} />}
        </Suspense>
      </AdminLayout>
    </AdminStatusContext.Provider>
  );
};

export default AdminConsole;
