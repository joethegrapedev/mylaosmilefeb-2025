import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";
const Banner = () => {
    return (_jsxs("section", { id: "home", className: "w-full pt-10 pb-20 flex flex-col gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700", children: [_jsx(LeftBanner, {}), _jsx(RightBanner, {})] }));
};
export default Banner;
