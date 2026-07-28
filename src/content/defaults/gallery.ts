import { GalleryContent } from '../../firebase/contentTypes';
import Pic1 from '../../assets/images/Pictures from past missions/Pic1.jpg';
import Pic2 from '../../assets/images/Pictures from past missions/Pic2.jpg';
import Pic3 from '../../assets/images/Pictures from past missions/Pic3.jpg';
import Pic4 from '../../assets/images/Pictures from past missions/Pic4.jpg';
import Pic5 from '../../assets/images/Pictures from past missions/Pic5.jpg';
import Pic6 from '../../assets/images/Pictures from past missions/Pic6.jpg';

export const galleryDefault: GalleryContent = {
  title: 'Our impact',
  des: 'Photo Gallery',
  items: [
    { id: 'gal-1', type: 'image', url: Pic2 },
    { id: 'gal-2', type: 'image', url: Pic3 },
    { id: 'gal-3', type: 'image', url: Pic1 },
    { id: 'gal-4', type: 'image', url: Pic4 },
    { id: 'gal-5', type: 'image', url: Pic5 },
    { id: 'gal-6', type: 'image', url: Pic6 },
  ],
};
