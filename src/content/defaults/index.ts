// Central registry of extracted default content. Each value is the current
// hardcoded site content, used both as the seed for `siteContent` and as the
// runtime fallback when Firestore is empty or unreachable.

import { ContentMap } from '../../firebase/contentTypes';
import { heroDefault } from './hero';
import { storyDefault } from './story';
import { joinUsDefault } from './joinus';
import { galleryDefault } from './gallery';
import { navbarDefault } from './navbar';
import { statisticsDefault } from './statistics';
import { missionsDefault } from './missions';

export {
  heroDefault,
  storyDefault,
  joinUsDefault,
  galleryDefault,
  navbarDefault,
  statisticsDefault,
  missionsDefault,
};

export const contentDefaults: ContentMap = {
  hero: heroDefault,
  story: storyDefault,
  joinus: joinUsDefault,
  gallery: galleryDefault,
  navbar: navbarDefault,
  statistics: statisticsDefault,
  missions: missionsDefault,
};
