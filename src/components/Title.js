import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Title = ({ title, des }) => {
    return (_jsxs("div", { className: "flex flex-col gap-4 font-titleFont mb-14", children: [_jsx("h3", { className: "text-sm uppercase font-light text-designColor tracking-wide", children: title }), _jsx("h1", { className: "text-4xl md:text-5xl text-gray-300 font-bold capitalize", children: des })] }));
};
export default Title;
