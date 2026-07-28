import React, { useState } from 'react';
import { SECTIONS } from '../sections';
import { SectionState } from '../../../firebase/content';
import { SectionKey } from '../../../firebase/contentTypes';

interface AdminLayoutProps {
  activeKey: SectionKey;
  onSelect: (key: SectionKey) => void;
  statuses: Record<string, SectionState>;
  userEmail?: string | null;
  onSignOut: () => void;
  onSeed: () => void;
  seeding: boolean;
  seedMessage: string | null;
  children: React.ReactNode;
}

function StatusDot({ state }: { state?: SectionState }) {
  if (!state) return null;
  if (state.hasUnpublishedChanges)
    return <span className="w-2 h-2 rounded-full bg-blue-500" title="Draft not published" />;
  if (state.hasPublished)
    return <span className="w-2 h-2 rounded-full bg-green-500" title="Published" />;
  return <span className="w-2 h-2 rounded-full bg-gray-300" title="Not set up" />;
}

/** Light-theme CMS shell: fixed sidebar of sections + top bar + content area. */
export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeKey,
  onSelect,
  statuses,
  userEmail,
  onSignOut,
  onSeed,
  seeding,
  seedMessage,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = SECTIONS.find((s) => s.key === activeKey);

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="text-lg font-bold text-gray-900">MyLaoSmile</div>
        <div className="text-xs text-gray-400">Content admin</div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              onSelect(s.key);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm text-left transition ${
              s.key === activeKey
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-base">{s.icon}</span>
            <span className="flex-1">{s.title}</span>
            <StatusDot state={statuses[s.key]} />
          </button>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-gray-200 space-y-2">
        <button
          onClick={onSeed}
          disabled={seeding}
          className="w-full text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          {seeding ? 'Seeding…' : 'Seed / migrate content'}
        </button>
        {seedMessage && <p className="text-xs text-gray-500">{seedMessage}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shrink-0">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-white border-r border-gray-200">{sidebar}</div>
          <div className="flex-1 bg-black/30" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-500"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="text-base font-semibold text-gray-800">
              {active ? active.title : 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {userEmail && <span className="hidden sm:inline text-sm text-gray-500">{userEmail}</span>}
            <button
              onClick={onSignOut}
              className="text-sm px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-700"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 max-w-5xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
