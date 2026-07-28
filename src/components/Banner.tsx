import { useEffect, useState } from "react";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";
import { getPublished } from "../firebase/content";
import { heroDefault } from "../content/defaults/hero";

const Banner = () => {
  const [hero, setHero] = useState(heroDefault);

  useEffect(() => {
    getPublished("hero", heroDefault).then(setHero);
  }, []);

  return (
    <section
      id="home"
      className="w-full pt-10 pb-20 flex flex-col gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700">
      <LeftBanner hero={hero} />
      <RightBanner hero={hero} />
    </section>
  );
};

export default Banner;
