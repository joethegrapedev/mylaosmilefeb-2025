import { useEffect, useState } from "react";
import Slider from "react-slick";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { getPublished } from "../firebase/content";
import { galleryDefault } from "../content/defaults/gallery";
import { youtubeEmbedUrl } from "../utils/youtube";
import { GalleryItem } from "../firebase/contentTypes";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-0 shadow-shadowOne cursor-pointer z-10"
      onClick={onClick}
    >
      {/* @ts-ignore */}
      <HiArrowRight />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-20 shadow-shadowOne cursor-pointer z-10"
      onClick={onClick}
    >
      {/* @ts-ignore */}
      <HiArrowLeft />
    </div>
  );
}

function GallerySlide({ item }: { item: GalleryItem }) {
  return (
    <div className="w-full">
      <div>
        {item.type === "youtube" ? (
          <iframe
            src={youtubeEmbedUrl(item.url)}
            title={item.caption || "Gallery video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        ) : (
          <img
            src={item.url}
            alt={item.caption || "Gallery image"}
            className="w-full h-full object-cover"
          />
        )}
        {item.caption && (
          <p className="text-center text-gray-400 mt-3">{item.caption}</p>
        )}
      </div>
    </div>
  );
}

const Testimonial = () => {
  const [dotActive, setDocActive] = useState(0);
  const [content, setContent] = useState(galleryDefault);

  useEffect(() => {
    getPublished("gallery", galleryDefault).then(setContent);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (next: any) => {
      setDocActive(next);
    },
    appendDots: (dots: any) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={
          i === dotActive
            ? {
                width: "12px",
                height: "12px",
                color: "blue",
                background: "#ff014f",
                borderRadius: "50%",
                cursor: "pointer",
              }
            : {
                width: "12px",
                height: "12px",
                color: "blue",
                background: "gray",
                borderRadius: "50%",
                cursor: "pointer",
              }
        }
      ></div>
    ),
  };

  const items = content.items ?? [];

  return (
    <section
      id="testimonial"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title title={content.title} des={content.des} />
        </div>
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No gallery items yet.
            </p>
          ) : (
            <Slider {...settings}>
              {items.map((item) => (
                <GallerySlide key={item.id} item={item} />
              ))}
            </Slider>
          )}
        </div>
      </FadeIn>
    </section>
  );
};

export default Testimonial;
