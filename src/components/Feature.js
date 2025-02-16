import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
// IMPORTANT NUMBER OF SURGERIES STATS ETC ALL HERE JUST EDIT DIRECTLY FOR NOW
const statistics = [
    { label: 'Surgeries Delivered', value: 102 },
    { label: 'Active Volunteers', value: 34 },
    { label: 'Medical Missions', value: 5 },
];
// number of surgeries, active volunteers, medical missions above
const Feature = () => {
    return (_jsx("section", { id: "features", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx(Title, { title: "Statistics", des: "" }), _jsx("section", { className: "bg-gray-100 py-16", children: _jsx("div", { className: "max-w-6xl mx-auto px-4", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: statistics.map((stat, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, className: "bg-white p-8 rounded-lg shadow-md text-center", children: [_jsx("div", { className: "text-4xl font-bold text-primary mb-2 text-gray-700", children: stat.value.toLocaleString() }), _jsx("div", { className: "text-xl text-gray-600", children: stat.label })] }, index))) }) }) })] }) }));
};
export default Feature;
