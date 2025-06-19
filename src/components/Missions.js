import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { getMissions } from "../firebase/missions";
const Missions = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadMissions = async () => {
            try {
                const data = await getMissions();
                setMissions(data);
            }
            catch (err) {
                console.error('Error loading missions:', err);
                setError('Failed to load missions');
                // Fallback to static data if Firebase fails
                setMissions([
                    { id: '1', date: "February 2025", location: "Vientiane", description: "33 Surgeries delivered", order: 1 },
                    { id: '2', date: "June 2024", location: "Luang Prabang", description: "8 Surgeries delivered", order: 2 },
                    { id: '3', date: "March 2024", location: "Savannakhet", description: "23 Surgeries delivered", order: 3 },
                    { id: '4', date: "October 2023", location: "Pakse", description: "28 Surgeries delivered", order: 4 },
                    { id: '5', date: "February 2023", location: "Vientiane", description: "17 Surgeries delivered", order: 5 },
                ]);
            }
            finally {
                setLoading(false);
            }
        };
        loadMissions();
    }, []);
    if (loading) {
        return (_jsx("section", { id: "missions", className: "bg-center w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx("div", { className: "flex justify-center items-center text-center", children: _jsx(Title, { title: "What we do", des: "Missions" }) }), _jsx("div", { className: "flex justify-center items-center mt-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-designColor mx-auto" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Loading missions..." })] }) })] }) }));
    }
    return (_jsx("section", { id: "missions", className: "bg-center w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx("div", { className: "flex justify-center items-center text-center", children: _jsx(Title, { title: "What we do", des: "Missions" }) }), _jsx("div", { className: "flex justify-center mt-8", children: _jsxs("div", { className: "w-full max-w-4xl px-4", children: [error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4", children: error })), _jsx("h3", { className: "text-xl font-semibold mb-6 text-center text-gray-800", children: "Our Recent Missions" }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: missions.map((mission) => (_jsxs("div", { className: "bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800", children: mission.location }), _jsx("span", { className: "text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded", children: mission.date })] }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: mission.description })] }, mission.id))) }), missions.length === 0 && !loading && (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-600", children: "No missions found." }) }))] }) })] }) }));
};
export default Missions;
