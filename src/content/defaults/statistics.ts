import { StatisticsContent } from '../../firebase/contentTypes';

export const statisticsDefault: StatisticsContent = {
  title: 'Statistics',
  items: [
    { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
    { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
    { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
  ],
};
