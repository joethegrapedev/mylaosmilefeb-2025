// Shared content type contract for the admin CMS.
// Every section's data shape lives here so the content service, the public
// components, and each section editor all code against one stable definition.

export type SectionKey =
  | 'hero'
  | 'story'
  | 'joinus'
  | 'gallery'
  | 'navbar'
  | 'statistics'
  | 'missions';

export interface SocialLinks {
  youtube: string;
  instagram: string;
  facebook: string;
}

// ---- Hero ----------------------------------------------------------------
export interface HeroContent {
  heading: string; // e.g. "Hi, we are"
  highlightedName: string; // e.g. "MyLaoSmile"
  subtitle: string;
  paragraph: string;
  findUsHeading: string;
  image: string; // URL (Storage download URL or external)
  social: SocialLinks;
}

// ---- Story / About -------------------------------------------------------
export interface Leader {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface RosterGroup {
  id: string;
  role: string;
  names: string[];
}

export interface Foreword {
  heading: string;
  paragraphs: string[];
  signature: string[];
}

// Closing credit rendered as a message rather than a named list (mirrors the
// preserved `src/data/contributors.ts` shape).
export interface Acknowledgement {
  role: string;
  message: string;
}

export interface StoryContent {
  title: string;
  videoUrl: string; // YouTube watch / youtu.be / embed URL
  historyHeading: string;
  historyParagraphs: string[];
  leaders: Leader[];
  roster: RosterGroup[];
  acknowledgement: Acknowledgement;
  foreword: Foreword;
}

// ---- Join Us -------------------------------------------------------------
export interface SeekingCard {
  id: string;
  heading: string;
  items: string[];
}

export interface JoinUsContent {
  title: string;
  des: string;
  paragraphs: string[];
  seekingHeading: string;
  cards: SeekingCard[];
  ctaLabel: string;
  ctaUrl: string;
}

// ---- Gallery -------------------------------------------------------------
export type GalleryItemType = 'image' | 'youtube';

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  url: string; // image URL or YouTube URL
  caption?: string;
}

export interface GalleryContent {
  title: string;
  des: string;
  items: GalleryItem[];
}

// ---- Navbar --------------------------------------------------------------
export interface NavLink {
  id: string;
  title: string;
  link: string; // react-scroll target id
}

export interface NavbarContent {
  logo: string;
  links: NavLink[];
  tagline: string;
  social: SocialLinks;
}

// ---- Statistics ----------------------------------------------------------
export interface StatisticItem {
  id: string;
  label: string;
  value: number;
  order: number;
}

export interface StatisticsContent {
  title: string;
  items: StatisticItem[];
}

// ---- Missions ------------------------------------------------------------
export interface MissionItem {
  id: string;
  title: string;
  description: string;
  order: number;
  reportUrl?: string;
  reportFileName?: string;
  storageFileName?: string;
}

export interface MissionsContent {
  title: string;
  des: string;
  timelineHeading: string;
  items: MissionItem[];
}

// ---- Master map ----------------------------------------------------------
export interface ContentMap {
  hero: HeroContent;
  story: StoryContent;
  joinus: JoinUsContent;
  gallery: GalleryContent;
  navbar: NavbarContent;
  statistics: StatisticsContent;
  missions: MissionsContent;
}
