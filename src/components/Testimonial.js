import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Slider from "react-slick";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import Pic2 from "../assets/images/Pictures from past missions/Pic2.jpg";
import Pic3 from "../assets/images/Pictures from past missions/Pic3.jpg";
import Pic1 from "../assets/images/Pictures from past missions/Pic1.jpg";
import Pic4 from "../assets/images/Pictures from past missions/Pic4.jpg";
import Pic5 from "../assets/images//Pictures from past missions/Pic5.jpg";
import Pic6 from "../assets/images/Pictures from past missions/Pic6.jpg";
function SampleNextArrow(props) {
    const { onClick } = props;
    return (_jsx("div", { className: "w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-0 shadow-shadowOne cursor-pointer z-10", onClick: onClick, children: _jsx(HiArrowRight, {}) }));
}
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (_jsx("div", { className: "w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-20 shadow-shadowOne cursor-pointer z-10", onClick: onClick, children: _jsx(HiArrowLeft, {}) }));
}
const Testimonial = () => {
    const [dotActive, setDocActive] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: _jsx(SampleNextArrow, {}),
        prevArrow: _jsx(SamplePrevArrow, {}),
        beforeChange: (next) => {
            setDocActive(next);
        },
        appendDots: (dots) => (_jsx("div", { style: {
                borderRadius: "10px",
                padding: "10px",
            }, children: _jsxs("ul", { style: {
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    marginTop: "20px",
                }, children: [" ", dots, " "] }) })),
        customPaging: (i) => (_jsx("div", { style: i === dotActive
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
                } })),
    };
    return (_jsx("section", { id: "testimonial", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx("div", { className: "flex justify-center items-center text-center", children: _jsx(Title, { title: "Our impact", des: "Photo Gallery" }) }), _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs(Slider, { ...settings, children: [_jsx("div", { className: "w-full", children: _jsx("div", { children: _jsx("img", { src: Pic2, alt: "Client Testimonial", onError: (e) => {
                                            e.currentTarget.src = 'https://drive.google.com/drive/u/4/folders/1ZBu_o2OsLBGAf_7P5HtiPZUMy32-gjJE'; // Replace with your fallback image URL
                                            e.currentTarget.alt = 'Fallback Image';
                                        } }) }) }), _jsx("div", { className: "w-full", children: _jsx("div", { children: _jsx("img", { src: Pic3, alt: "Client Testimonial", onError: (e) => {
                                            e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                                            e.currentTarget.alt = 'Fallback Image';
                                        } }) }) }), _jsx("div", { className: "w-full", children: _jsx("div", { children: _jsx("img", { src: Pic1, alt: "Client Testimonial", onError: (e) => {
                                            e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                                            e.currentTarget.alt = 'Fallback Image';
                                        } }) }) }), _jsx("div", { className: "w-full", children: _jsx("div", { children: _jsx("img", { src: Pic4, alt: "Client Testimonial", onError: (e) => {
                                            e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                                            e.currentTarget.alt = 'Fallback Image';
                                        } }) }) }), _jsx("div", { className: "w-full", children: _jsx("div", { children: _jsx("img", { src: Pic5, alt: "Client Testimonial", onError: (e) => {
                                            e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                                            e.currentTarget.alt = 'Fallback Image';
                                        } }) }) }), _jsx("div", { className: "w-full", children: _jsx("div", { children: _jsx("img", { src: Pic6, alt: "Client Testimonial", onError: (e) => {
                                            e.currentTarget.src = 'https://www.google.com/imgres?q=leslie%20kuek&imgurl=https%3A%2F%2Fwww.farrerpark.com%2Fdam%2Fjcr%3A5f16b4d2-012c-4bf3-9062-974f94ac7b5e%2FLeslieKuek.jpg&imgrefurl=https%3A%2F%2Fwww.farrerpark.com%2Fpatients-and-visitors%2Fdoctor%2Fdetail.html%3Fid%3D257&docid=J2LqkHkJwl93pM&tbnid=DMD93QCv4I8QPM&vet=12ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA..i&w=518&h=518&hcb=2&ved=2ahUKEwjF2vH6xImKAxWZ7zgGHba3LSEQM3oECBgQAA'; // Replace with your fallback image URL
                                            e.currentTarget.alt = 'Fallback Image';
                                        } }) }) })] }) })] }) }));
};
export default Testimonial;
