import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FadeIn } from "./FadeIn";
const LeftBanner = () => {
    // const [text] = useTypewriter({
    //   words: ["Professional Coder.", "Full Stack Developer.", "UI Designer."],
    //   loop: true,
    //   typeSpeed: 20,
    //   deleteSpeed: 10,
    //   delaySpeed: 2000,
    // });
    return (_jsxs(FadeIn, { className: "w-full lgl:w-1/2 flex flex-col gap-20", children: [_jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs("h1", { className: "text-6xl font-bold text-black font-Arial", children: ["Hi, we are ", _jsx("span", { className: " text-lime-400 capitalize", children: "MyLaoSmile" })] }), _jsx("h2", { className: "text-4xl font-bold text-gray-400", children: "a non-profit organization aimed at spreading Smiles." }), _jsx("p", { className: "text-base font-titleFont text-xl leading-6 tracking-wider text-black", children: "MyLaoSmile is an alliance of healthcare professionals based in Singapore working together to treat patients with burns and other facial deformities. Through deliving free surgical aid to the underpriviledged in Laos, we aim to spread smiles and deliver care accross borders, building a smilier world for all." })] }), _jsx("div", { className: "flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between", children: _jsxs("div", { children: [_jsx("h2", { className: "text-base uppercase font-titleFont mb-4 text-black", children: "Find us at" }), _jsxs("div", { className: "flex gap-4", children: [_jsx("a", { href: "https://youtu.be/_dih2JOb2C8", target: "_blank", children: _jsx("span", { className: "bannerIcon", children: _jsx(FaYoutube, {}) }) }), _jsx("a", { href: "https://www.instagram.com/mountelizabethhospitals/p/C0d2R7lInFg/?next=%2Frubykantor%2F&hl=ja&img_index=1", target: "_blank", children: _jsx("span", { className: "bannerIcon", children: _jsx(FaInstagram, {}) }) }), _jsx("a", { href: "https://www.facebook.com/watch/?v=1032449527847176", target: "_blank", children: _jsx("span", { className: "bannerIcon", children: _jsx(FaFacebookF, {}) }) })] })] }) })] }));
};
export default LeftBanner;
