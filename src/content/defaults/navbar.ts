import { NavbarContent } from '../../firebase/contentTypes';
import logo from '../../assets/images/logo.png';

export const navbarDefault: NavbarContent = {
  logo,
  links: [
    { id: 'nav-home', title: 'Home', link: 'home' },
    { id: 'nav-stats', title: 'Statistics', link: 'features' },
    { id: 'nav-missions', title: 'Missions', link: 'projects' },
    { id: 'nav-about', title: 'About Us', link: 'Resume' },
    { id: 'nav-join', title: 'Join us', link: 'joinus' },
    { id: 'nav-gallery', title: 'Photo gallery', link: 'testimonial' },
  ],
  tagline: 'Bringing smiles one surgery at a time',
  social: {
    youtube: 'https://youtu.be/_dih2JOb2C8',
    instagram:
      'https://www.instagram.com/mountelizabethhospitals/p/C0d2R7lInFg/?next=%2Frubykantor%2F&hl=ja&img_index=1',
    facebook: 'https://www.facebook.com/watch/?v=1032449527847176',
  },
};
