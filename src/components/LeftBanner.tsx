
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FadeIn } from "./FadeIn";
import { HeroContent } from "../firebase/contentTypes";

interface LeftBannerProps {
  hero: HeroContent;
}

const LeftBanner = ({ hero }: LeftBannerProps) => {
  return (
    <FadeIn className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">

        <h1 className="text-6xl font-bold text-black font-Arial">
          {hero.heading}{" "}
          <span className=" text-lime-400 capitalize">{hero.highlightedName}</span>
        </h1>
        <h2 className="text-4xl font-bold text-gray-400">
          {hero.subtitle}
        </h2>
        <p className="text-base font-titleFont text-xl leading-6 tracking-wider text-black">
          {hero.paragraph}
        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">

{/* This section below is for the icons and the links to the social media platforms.

=======================================================================================*/}
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4 text-black">
            {hero.findUsHeading}
          </h2>
          <div className="flex gap-4">
            <a href={hero.social.youtube} target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaYoutube />
              </span>
            </a>

            <a href={hero.social.instagram} target="_blank">
              <span className="bannerIcon">
                {/* @ts-ignore */}
                <FaInstagram />
              </span>
            </a>

            <a href={hero.social.facebook} target="_blank">
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
