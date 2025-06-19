import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutAdmin } from '../../firebase/auth';
import StatisticsEditor from './StatisticsEditor';
import MissionsEditor from './MissionsEditor';
const AdminConsole = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
            else {
                navigate('/admin/signin');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);
    const handleSignOut = async () => {
        const result = await signOutAdmin();
        if (result.success) {
            navigate('/admin/signin');
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-bodyColor flex items-center justify-center", children: _jsx("div", { className: "text-lightText", children: "Loading..." }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx("div", { className: "bg-gray-800 shadow", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center py-6", children: [_jsx("div", { className: "flex items-center", children: _jsx("h1", { className: "text-3xl font-bold text-white", children: "Admin Console" }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "text-gray-300", children: ["Welcome, ", user?.email] }), _jsx("button", { onClick: handleSignOut, className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium", children: "Sign Out" })] })] }) }) }), _jsx("div", { className: "bg-gray-800 border-b border-gray-700", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("nav", { className: "flex space-x-8", "aria-label": "Tabs", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('statistics'), className: `py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'statistics'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'}`, children: "Statistics" }), _jsx("button", { onClick: () => setActiveTab('missions'), className: `py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'missions'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'}`, children: "Missions" })] }) }) }), _jsx("div", { className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8", children: _jsxs("div", { className: "px-4 py-6 sm:px-0", children: [activeTab === 'dashboard' && (_jsx("div", { className: "border-4 border-dashed border-gray-600 rounded-lg h-96 p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-semibold text-white mb-4", children: "Admin Dashboard" }), _jsx("p", { className: "text-gray-400 mb-8", children: "Welcome to the admin console. Here you can manage your website content and settings." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-2", children: "Statistics" }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Manage website statistics and numbers" }), _jsx("button", { onClick: () => setActiveTab('statistics'), className: "text-blue-400 hover:text-blue-300 text-sm", children: "Edit Statistics \u2192" })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-2", children: "Missions" }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Manage mission history and updates" }), _jsx("button", { onClick: () => setActiveTab('missions'), className: "text-blue-400 hover:text-blue-300 text-sm", children: "Edit Missions \u2192" })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-2", children: "Analytics" }), _jsx("p", { className: "text-gray-400 text-sm", children: "View website analytics and reports" })] })] })] }) })), activeTab === 'statistics' && (_jsx(StatisticsEditor, {})), activeTab === 'missions' && (_jsx(MissionsEditor, {}))] }) })] }));
};
export default AdminConsole;
