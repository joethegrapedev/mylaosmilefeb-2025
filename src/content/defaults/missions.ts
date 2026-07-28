import { MissionsContent } from '../../firebase/contentTypes';

export const missionsDefault: MissionsContent = {
  title: 'What we do',
  des: 'Missions',
  timelineHeading: 'Our Mission Timeline',
  items: [
    { id: 'mission-1', title: 'February 2025', description: '33 Surgeries delivered', order: 1 },
    { id: 'mission-2', title: 'June 2024', description: '8 Surgeries delivered', order: 2 },
    { id: 'mission-3', title: 'March 2024', description: '23 Surgeries delivered', order: 3 },
    { id: 'mission-4', title: 'October 2023', description: '28 Surgeries delivered', order: 4 },
    { id: 'mission-5', title: 'February 2023', description: '17 Surgeries delivered', order: 5 },
  ],
};
