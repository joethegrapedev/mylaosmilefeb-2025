import { JoinUsContent } from '../../firebase/contentTypes';

export const joinUsDefault: JoinUsContent = {
  title: 'JOIN US',
  des: 'Medical Volunteering',
  paragraphs: [
    "Thousands of young children in Laos live with untreated correctable conditions such as cleft lips, palates and burn contractures, simply because of the lack of accessibility of adequate surgical care. Your skills can help rewrite a patient's future.",
    'Our Reconstructive Surgery Mission Team welcomes skilled and compassionate medical volunteers to provide life-changing procedures for these children, as well as hands-on training for local healthcare professionals.',
  ],
  seekingHeading: "We're seeking:",
  cards: [
    {
      id: 'card-surgeons',
      heading: 'Surgeons',
      items: ['Plastic & reconstructive surgeons', 'Hand surgeons'],
    },
    { id: 'card-anaesthesia', heading: 'Anaesthesia', items: ['Anaesthetists'] },
    {
      id: 'card-nurses',
      heading: 'Nurses',
      items: ['Operating Room Nurse', 'Recovery Room/ Ward Nurse', 'Pediatric trained Nurse'],
    },
  ],
  ctaLabel: 'Apply to Volunteer',
  ctaUrl: 'https://forms.gle/4HddM3irgzARN3DT6',
};
