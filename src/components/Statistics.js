import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
import { useState } from "react";
const Feature = () => {
    const [statistics, setStatistics] = useState([
        { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
        { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
        { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Temporarily disable Firebase loading to debug
    // useEffect(() => {
    //   const fetchStatistics = async () => {
    //     try {
    //       const stats = await getStatistics();
    //       setStatistics(stats);
    //       setError(null);
    //     } catch (error) {
    //       console.error('Error loading statistics:', error);
    //       setError('Failed to load statistics');
    //       // Set fallback statistics
    //       setStatistics([
    //         { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
    //         { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
    //         { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
    //       ]);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   fetchStatistics();
    // }, []);
    if (loading) {
        return (_jsx("section", { id: "features", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx(Title, { title: "Statistics", des: "" }), _jsx("section", { className: "bg-gray-100 py-16", children: _jsx("div", { className: "max-w-6xl mx-auto px-4", children: _jsx("div", { className: "text-center text-gray-600", children: "Loading statistics..." }) }) })] }) }));
    }
    return (_jsx("section", { id: "features", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx(Title, { title: "Statistics", des: "" }), _jsx("section", { className: "bg-gray-100 py-16", children: _jsx("div", { className: "max-w-6xl mx-auto px-4", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: statistics.map((stat, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, children: [_jsx("div", { className: "text-4xl font-bold text-primary mb-2 text-gray-700", children: stat.value.toLocaleString() }), _jsx("div", { className: "text-xl text-gray-600", children: stat.label })] }, stat.id))) }) }) })] }) }));
};
export default Feature;
