import { HeroContent } from '../../firebase/contentTypes';
import bannerImg from '../../assets/images/bannerImg.png';

export const heroDefault: HeroContent = {
  heading: 'Hi, we are',
  highlightedName: 'MyLaoSmile',
  subtitle: 'a non-profit organization aimed at spreading Smiles.',
  paragraph:
    'MyLaoSmile is an alliance of healthcare professionals based in Singapore working together to treat patients with burns and other facial deformities. Through deliving free surgical aid to the underpriviledged in Laos, we aim to treat children with cleft lip burns, and congenital hand deformities.',
  findUsHeading: 'Find us at',
  image: bannerImg,
  social: {
    youtube: 'https://youtu.be/_dih2JOb2C8',
    instagram:
      'https://www.instagram.com/mountelizabethhospitals/p/C0d2R7lInFg/?next=%2Frubykantor%2F&hl=ja&img_index=1',
    facebook: 'https://www.facebook.com/watch/?v=1032449527847176',
  },
};
