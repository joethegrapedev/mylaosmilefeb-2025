
import { FaFacebookF, FaYoutube, FaInstagram, FaReact } from "react-icons/fa";
import { FadeIn } from "./FadeIn";

const LeftBanner = () => {
  // const [text] = useTypewriter({
  //   words: ["Professional Coder.", "Full Stack Developer.", "UI Designer."],
  //   loop: true,
  //   typeSpeed: 20,
  //   deleteSpeed: 10,
  //   delaySpeed: 2000,
  // });
  return (
    <FadeIn className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        
        <h1 className="text-6xl font-bold text-black font-Arial">
          Hi, we are <span className=" text-lime-400 capitalize">MyLaoSmile</span>
        </h1>
        <h2 className="text-4xl font-bold text-gray-400">
          a non-profit organization aimed at spreading Smiles.
        </h2>
        <p className="text-base font-titleFont text-xl leading-6 tracking-wider text-black">
          MyLaoSmile is an alliance of healthcare professionals based in Singapore working together to 
          treat patients with burns and other facial deformities. Through deliving free surgical 
          aid to the underpriviledged in Laos, we aim to treat children with cleft lip burns, and congenital hand deformities.
        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
        
{/* This section below is for the icons and the links to the social media platforms. 

=======================================================================================*/}
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4 text-black">
            Find us at
          </h2>
          <div className="flex gap-4">
            <a href="https://youtu.be/_dih2JOb2C8" target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaYoutube />
              </span>
            </a>
            
            <a href="https://www.instagram.com/mountelizabethhospitals/p/C0d2R7lInFg/?next=%2Frubykantor%2F&hl=ja&img_index=1" target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaInstagram />
              </span>
            </a>
            
            <a href="https://www.facebook.com/watch/?v=1032449527847176" target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaFacebookF />
              </span>
            </a>
          </div>
        </div>

{/* not needed for website, unless you want to include more icons */}

        {/* <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            BEST SKILL ON
          </h2>
          <div className="flex gap-4">
            <span className="bannerIcon">
              <FaReact />
            </span>
            <span className="bannerIcon">
              <SiNextdotjs />
            </span>
            <span className="bannerIcon">
              <SiTailwindcss />
            </span>
            <span className="bannerIcon">
              <SiFigma />
            </span>
          </div>
        </div> */}
      </div>
    </FadeIn>
  );
};

export default LeftBanner;
