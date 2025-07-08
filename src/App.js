import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from "./components/Banner";
import Feature from "./components/Statistics";
import Navbar from "./components/Navbar";
import Projects from "./components/Missions";
import Resume from "./components/Resume";
import Testimonial from "./components/Testimonial";
import AdminSignIn from "./components/admin/AdminSignIn";
import AdminConsole from "./components/admin/AdminConsole";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import './utils/testMissions'; // Import test functions for browser console
// Main website component
const MainSite = () => {
    return (_jsxs("main", { className: "font-bodyFont w-full h-auto bg-bodyColor text-lightText", children: [_jsx(Navbar, {}), _jsx("div", { className: "px-4", children: _jsxs("div", { className: "max-w-screen-xl mx-auto", children: [_jsx(Banner, {}), _jsx(Feature, {}), _jsx(Projects, {}), _jsx(Resume, {}), _jsx(Testimonial, {})] }) })] }));
};
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainSite, {}) }), _jsx(Route, { path: "/test", element: _jsx("div", { className: "min-h-screen bg-red-500 flex items-center justify-center text-white text-4xl", children: "ROUTING WORKS!" }) }), _jsx(Route, { path: "/admin/signin", element: _jsx(AdminSignIn, {}) }), _jsx(Route, { path: "/admin/console", element: _jsx(ProtectedRoute, { children: _jsx(AdminConsole, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(AdminSignIn, {}) })] }) }));
}
export default App;
