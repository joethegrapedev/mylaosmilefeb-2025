import { StoryContent } from '../../firebase/contentTypes';
import Cordelia from '../../assets/images/Cordelia.jpeg';
import { contributorGroups, localAcknowledgement } from '../../data/contributors';

export const storyDefault: StoryContent = {
  title: 'Our Story',
  videoUrl: 'https://www.youtube.com/embed/_dih2JOb2C8',
  historyHeading: 'The History of MyLaoSmile',
  historyParagraphs: [
    'The MyLaoSMILE project was started in 2023 by Prof. Lee Seng Teik and is now led by Dr Leslie Kuek and Dr. Woffles Wu. With the support of many medical professionals from Singapore, the team strives to continue restore basic human functions to children in Laos which every child should enjoy.',
    'In partnership with Lao Friends Hospital for Children, the surgical team has fostered many connections and works together to provide free reconstructive surgeries that help children eat, speak, and smile without fear. Our team performs a wide range of procedures including cleft lip repair, cleft palate repair, burns contracture scar release and congenital hand surgery.',
    'Beyond surgery, the team is deeply committed to making a lasting impact by training local doctors, equipping them with the skills and knowledge to continue treating cleft conditions. This ensures that future generations of children will receive the care they need long after the mission ends.',
  ],
  leaders: [
    {
      id: 'leader-1',
      name: 'Dr. Leslie Kuek',
      role: 'Mission Leader',
      image:
        'https://www.farrerpark.com/dam/jcr:5f16b4d2-012c-4bf3-9062-974f94ac7b5e/LeslieKuek.jpg',
    },
    { id: 'leader-2', name: 'Nurse Cordelia', role: 'Mission Coordinator', image: Cordelia },
    {
      id: 'leader-3',
      name: 'Prof. Lee Seng Teik',
      role: 'Founder/Advisor',
      image:
        'https://mindfulnessacademy.org/images/events/conferences/2015-MTeachers/speakers/LeeSengTeik-pt.jpg',
    },
    {
      id: 'leader-4',
      name: 'Dr. Woffles Wu',
      role: 'Senior Plastic Surgeon/Team Leader',
      image: 'https://www.woffleswu.com/wp-content/uploads/2020/06/AN-EYELID-FOR-BEAUTY-cover.jpg',
    },
  ],
  // Roster is sourced from the shared contributors module so the admin default
  // stays in sync with the site's "Our Contributors" content.
  roster: contributorGroups.map((group) => ({
    id: `roster-${group.role.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    role: group.role,
    names: [...group.names],
  })),
  acknowledgement: {
    role: localAcknowledgement.role,
    message: localAcknowledgement.message,
  },
  foreword: {
    heading: 'Foreword',
    paragraphs: [
      'It was four years ago in 2019 that I received a request from Dr Lisa Rynn, Medical Director of Lao Friends Hospital for Children (LFHC) for specialist medical help for the children in Luang Prabang Province of Lao PDR. There were many children with cleft lip and palate condition and post-burns contractures who required specialised plastic and reconstructive surgery.',
      'In 2020, this request for a humanitarian mission to LFHC was approved by SGH (Singapore General Hospital) Medical Board using the SGH Health Development Fund under SGH Cleft Missions-Laos account. Unfortunately, due to the onset of the COVID-19 pandemic, this mission had to be postponed until travel restrictions were lifted in 2023 after a lapse of 3 years.',
      'In 2022, we decided to conduct a recce mission to find out the status of patients at LFHC, to view for ourselves the operating facilities at LFHC, and also to meet with the new management of the children’s hospital. This recce mission took place 26 – 29th November 2022, and the key personnel (3 surgeons and 1 OT nurse) undertook this trip.',
      'On 20th December 2022, I received a formal request from the new Medical Director of LFHC, Dr Thomas Brune, for assistance with cleft lip and palate, and post-burns patients who were in need of reconstructive surgery. Due to the COVID-19 pandemic, there had been a backlog of patients. I sought immediate support for the team to be reactivated and the approval was promptly given by Chairman Medical Board as well as Chief Nurse of SGH.',
      'So the task of assembling the team of volunteer doctors (surgeons and anaesthetists) as well as OT and ward nurses started. The dates of the mission were set for 23rd Feb 2023 to 2nd March 2023 and the logistics of organising the mission was done actively by the team members themselves. Internet communication helped but the team of 13 members met twice to smooth out all the organisational details of the mission.',
      'This report provides insights to the work done, the working conditions and the challenges we faced, yet expertly overcome. It also speaks volumes of the love, dedication and professionalism of our volunteer doctors, dentist, and nurses, not to mention the warmth and welcome of the Laotian people, and our collaboration with the staff of LFHC.',
    ],
    signature: [
      'Dr Lee Seng Teik',
      'Chef de Mission',
      'Clinical Professor and Emeritus Consultant',
      'Department of Plastic, Reconstructive & Aesthetic Surgery',
      'Singapore General Hospital',
    ],
  },
};
