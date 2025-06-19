import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAdmin } from '../../firebase/auth';
const AdminSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await signInAdmin(email, password);
        if (result.success) {
            navigate('/admin/console');
        }
        else {
            setError(result.error || 'Failed to sign in');
        }
        setLoading(false);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-white", children: "\uD83D\uDD10 Admin Sign In" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-300", children: "Access the admin console" }), _jsx("p", { className: "mt-2 text-center text-xs text-red-400", children: "DEBUG: This is the AdminSignIn component!" })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSignIn, children: [_jsxs("div", { className: "rounded-md shadow-sm -space-y-px", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email-address", className: "sr-only", children: "Email address" }), _jsx("input", { id: "email-address", name: "email", type: "email", autoComplete: "email", required: true, className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-lightText bg-gray-800 rounded-t-md focus:outline-none focus:ring-designColor focus:border-designColor focus:z-10 sm:text-sm", placeholder: "Email address", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "sr-only", children: "Password" }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-lightText bg-gray-800 rounded-b-md focus:outline-none focus:ring-designColor focus:border-designColor focus:z-10 sm:text-sm", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value) })] })] }), error && (_jsx("div", { className: "rounded-md bg-red-900 bg-opacity-50 p-4", children: _jsx("div", { className: "text-sm text-red-200", children: error }) })), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-designColor hover:bg-designColor/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-designColor disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? 'Signing in...' : 'Sign in' }) })] })] }) }));
};
export default AdminSignIn;
