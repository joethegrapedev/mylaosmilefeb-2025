import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TestComponent = () => {
    return (_jsxs("div", { style: { backgroundColor: 'red', color: 'white', padding: '20px', margin: '20px' }, children: [_jsx("h1", { children: "TEST COMPONENT - If you see this, React is working!" }), _jsx("p", { children: "The issue might be with CSS or component styling." })] }));
};
export default TestComponent;
