// Global type overrides for react-icons to fix JSX compatibility
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Override react-icons module declarations
declare module 'react-icons/hi' {
  import React from 'react';
  export const HiArrowRight: React.FC<React.SVGProps<SVGSVGElement>>;
  export const HiArrowLeft: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module 'react-icons/fa' {
  import React from 'react';
  export const FaYoutube: React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaInstagram: React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaFacebookF: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module 'react-icons/fi' {
  import React from 'react';
  export const FiMenu: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module 'react-icons/md' {
  import React from 'react';
  export const MdClose: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module 'react-icons/bs' {
  import React from 'react';
  export const BsGithub: React.FC<React.SVGProps<SVGSVGElement>>;
}

export {};
