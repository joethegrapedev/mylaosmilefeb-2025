import { useState } from "react";
import Slider from "react-slick";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import Title from "./Title";
import { quote} from "../assets";
import { FadeIn } from "./FadeIn";
import Pic2 from "../assets/images/Pictures from past missions/Pic2.jpg";
import Pic3 from "../assets/images/Pictures from past missions/Pic3.jpg";
import Pic1 from "../assets/images/Pictures from past missions/Pic1.jpg";
import Pic4 from "../assets/images/Pictures from past missions/Pic4.jpg";
import Pic5 from "../assets/images//Pictures from past missions/Pic5.jpg"
import Pic6 from "../assets/images/Pictures from past missions/Pic6.jpg"

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

const Testimonial = () => {
  const [dotActive, setDocActive] = useState(0);
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
  return (
    <section
      id="testimonial"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title title="Our impact" des="Photo Gallery" />
        </div>
        <div className="max-w-6xl mx-auto">
          {/* ================ Slider One ================== */}
          <Slider {...settings}>
            <div className="w-full">
              <div>
                <img
                  src={Pic2}
                  alt="Client Testimonial"
                  onError={(e) => {
                    e.currentTarget.src = 'https://drive.google.com/drive/u/4/folders/1ZBu_o2OsLBGAf_7P5HtiPZUMy32-gjJE'; // Replace with your fallback image URL
                    e.currentTarget.alt = 'Fallback Image';
                  }}
                />
              </div>
            </div>
            {/* ================ Slider Two ================== */}
            
            <div className="w-full">
              <div>
                <img
                  src={Pic3}
                  alt="Client Testimonial"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                    e.currentTarget.alt = 'Fallback Image';
                  }}
                />
              </div>
            </div>
            
            
            
            
            {/* <div className="w-full">
              <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
                <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 rounded-lg shadow-shadowOne flex flex-col md:flex-row lgl:flex-col gap-8 justify-center md:justify-start lgl:justify-center">
                  <img
                    className="h-72 md:h-32 lgl:h-72 rounded-lg object-cover"
                    src={testimonialTwo}
                    alt="testimonialTwo"
                  />
                  <div className="w-full flex flex-col justify-end">
                    <p className="text-xs uppercase text-designColor tracking-wide mb-2">
                      Bound - Trolola
                    </p>
                    <h3 className="text-2xl font-bold">Jone Duone Joe</h3>
                    <p className="text-base tracking-wide text-gray-500">
                      Operation Officer
                    </p>
                  </div>
                </div>
                <div className="w-full lgl:w-[60%] h-full flex flex-col justify-between">
                  <img className="w-20 lgl:w-32" src={quote} alt="quote" />
                  <div className="w-full h-[70%] py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] rounded-lg shadow-shadowOne p-4 lgl:p-8 flex flex-col justify-center gap-4 lgl:gap-8">
                    <div className="flex flex-col justify-between lgl:items-center py-6 border-b-2 border-b-gray-900">
                      <div>
                        <h3 className="text-xl lgl:text-2xl font-medium tracking-wide">
                          Travel Mobile App Design.
                        </h3>
                        <p className="text-base text-gray-400 mt-3">
                          via Upwork - Mar 4, 2015 - Aug 30, 2021 test
                        </p>
                      </div>
                      <div className="text-yellow-500 flex gap-1">
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                      </div>
                    </div>
                    <p className="text-base font-titleFont text-gray-400 font-medium tracking-wide leading-6">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      A dolorum, eos natus ipsum numquam veniam officia
                      necessitatibus ratione quos debitis exercitationem
                      repudiandae facilis id neque nihil accusantium
                      perspiciatis repellat? Iste.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* ================ Slider Three ================== */}
            <div className="w-full">
              <div>
                <img
                  src={Pic1}
                  alt="Client Testimonial"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                    e.currentTarget.alt = 'Fallback Image';
                  }}
                />
              </div>
            </div>
            

            {/*Slide 4*/}
            <div className="w-full">
              <div>
                <img
                  src={Pic4}
                  alt="Client Testimonial"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                    e.currentTarget.alt = 'Fallback Image';
                  }}
                />
              </div>
            </div>
            
            <div className="w-full">
              <div>
                <img
                  src={Pic5}
                  alt="Client Testimonial"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                    e.currentTarget.alt = 'Fallback Image';
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <div>
                <img
                  src={Pic6}
                  alt="Client Testimonial"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                    e.currentTarget.alt = 'Fallback Image';
                  }}
                />
              </div>
            </div>


          </Slider>
        </div>
      </FadeIn>
    </section>
  );
};

export default Testimonial;
