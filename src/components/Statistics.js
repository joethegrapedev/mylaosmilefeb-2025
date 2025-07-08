import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getStatistics } from "../firebase/statistics";
const Statistics = () => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const stats = await getStatistics();
                setStatistics(stats);
                setError(null);
            }
            catch (error) {
                console.error('Error loading statistics:', error);
                setError('Failed to load statistics');
                // Set fallback statistics
                setStatistics([
                    { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
                    { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
                    { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
                ]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, []);
    if (loading) {
        return (_jsx("section", { id: "features", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx(Title, { title: "Statistics", des: "" }), _jsx("section", { className: "bg-gray-100 py-16", children: _jsx("div", { className: "max-w-6xl mx-auto px-4", children: _jsx("div", { className: "flex justify-center items-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-designColor mx-auto" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Loading statistics..." })] }) }) }) })] }) }));
    }
    return (_jsx("section", { id: "features", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx(Title, { title: "Statistics", des: "" }), _jsx("section", { className: "bg-gray-100 py-16", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center", children: error })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: statistics.map((stat, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, children: [_jsx("div", { className: "text-4xl font-bold text-primary mb-2 text-gray-700", children: stat.value.toLocaleString() }), _jsx("div", { className: "text-xl text-gray-600", children: stat.label })] }, stat.id))) }), statistics.length === 0 && !loading && (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-600", children: "No statistics found." }) }))] }) })] }) }));
};
export default Statistics;
