import React, { lazy } from 'react';
import { SectionKey } from '../../firebase/contentTypes';

// The admin section registry — the single source of truth for the sidebar and
// the editor router. Frozen during the foundation phase so parallel section
// work only touches the individual editor files, never this file.

export interface SectionDef {
  key: SectionKey;
  title: string;
  description: string;
  icon: string; // emoji used in the sidebar
  Editor: React.LazyExoticComponent<React.ComponentType>;
}

export const SECTIONS: SectionDef[] = [
  {
    key: 'hero',
    title: 'Hero',
    description: 'Landing headline, intro paragraph, hero image and social links.',
    icon: '🏠',
    Editor: lazy(() => import('./editors/HeroEditor')),
  },
  {
    key: 'statistics',
    title: 'Statistics',
    description: 'Headline numbers shown near the top of the page.',
    icon: '📊',
    Editor: lazy(() => import('./editors/StatisticsEditor')),
  },
  {
    key: 'missions',
    title: 'Missions',
    description: 'The mission timeline and mission report PDFs.',
    icon: '🗓️',
    Editor: lazy(() => import('./editors/MissionsEditor')),
  },
  {
    key: 'story',
    title: 'About / Our Story',
    description: 'Story video, history, foreword letter and the team lists.',
    icon: '📖',
    Editor: lazy(() => import('./editors/StoryEditor')),
  },
  {
    key: 'joinus',
    title: 'Join Us',
    description: 'Volunteering copy, the roles we seek and the apply link.',
    icon: '🤝',
    Editor: lazy(() => import('./editors/JoinUsEditor')),
  },
  {
    key: 'gallery',
    title: 'Photo Gallery',
    description: 'Photos and YouTube videos shown in the gallery carousel.',
    icon: '🖼️',
    Editor: lazy(() => import('./editors/GalleryEditor')),
  },
  {
    key: 'navbar',
    title: 'Navbar & Social',
    description: 'Logo, navigation links and header social links.',
    icon: '🧭',
    Editor: lazy(() => import('./editors/NavbarEditor')),
  },
];

export const getSection = (key: string): SectionDef | undefined =>
  SECTIONS.find((s) => s.key === key);
