import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from "./Title";
// import ProjectsCard from "./ProjectsCard";
// import { projectOne, projectThree, projectTwo } from "../assets";
import { FadeIn } from "./FadeIn";
{ /* INFORMATION ABOUT THE DIFFERENT MISSIONS BELOW */ }
const missions = [
    { id: 1, date: " ", location: "Feb 2025", description: "33 Surgeries delivered" },
    { id: 2, date: " ", location: "June 2024", description: "8 Surgeries delivered" },
    { id: 3, date: " ", location: "Mar 2024", description: "23 Surgeries delivered" },
    { id: 4, date: " ", location: "Oct 2023", description: "28 Surgeries delivered" },
    { id: 5, date: " ", location: "Feb 2023", description: "17 Surgeries delivered" },
];
{ /* INFORMATION ABOUT THE DIFFERENT MISSIONS ABOVE */ }
const Projects = () => {
    return (_jsx("section", { className: "bg-center", id: "projects", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsx("div", { className: "flex justify-center items-center text-center", children: _jsx(Title, { title: "What we do", des: "Missions" }) }), _jsx("div", { children: _jsxs("div", { className: "md:w-3/4", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4", children: ["Latest Missions as of ", ("11 Feb 2025")] }), _jsx("ul", { className: "space-y-4", children: missions.map((mission) => (_jsxs("li", { className: "bg-white shadow rounded-lg p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h4", { className: "text-lg font-semibold", children: mission.location }), _jsx("span", { className: "text-sm text-gray-500" })] }), _jsx("p", { className: "text-gray-700", children: mission.description })] }, mission.id))) })] }) })] }) }));
};
export default Projects;
