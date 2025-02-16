import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Banner from "./components/Banner";
import Feature from "./components/Feature";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Testimonial from "./components/Testimonial";
function App() {
    return (_jsxs("main", { className: "font-bodyFont w-full h-auto bg-bodyColor text-lightText", children: [_jsx(Navbar, {}), _jsx("div", { className: "px-4", children: _jsxs("div", { className: "max-w-screen-xl mx-auto", children: [_jsx(Banner, {}), _jsx(Feature, {}), _jsx(Projects, {}), _jsx(Resume, {}), _jsx(Testimonial, {})] }) })] }));
}
export default App;
