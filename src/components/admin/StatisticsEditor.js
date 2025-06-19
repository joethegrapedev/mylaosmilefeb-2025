import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getStatistics, updateStatistic, initializeDefaultStatistics } from '../../firebase/statistics';
const StatisticsEditor = () => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        loadStatistics();
    }, []);
    const loadStatistics = async () => {
        try {
            setLoading(true);
            const stats = await getStatistics();
            setStatistics(stats);
        }
        catch (error) {
            setError('Failed to load statistics: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    };
    const handleUpdateStatistic = async (stat) => {
        setSaving(stat.id);
        setError(null);
        setSuccess(null);
        const result = await updateStatistic(stat);
        if (result.success) {
            setSuccess(`Updated ${stat.label} successfully!`);
            // Refresh the statistics
            await loadStatistics();
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        }
        else {
            setError(`Failed to update ${stat.label}: ${result.error}`);
        }
        setSaving(null);
    };
    const handleInputChange = (id, field, value) => {
        setStatistics(prev => prev.map(stat => stat.id === id
            ? { ...stat, [field]: field === 'value' || field === 'order' ? Number(value) : value }
            : stat));
    };
    const handleInitializeDefaults = async () => {
        setSaving('initializing');
        setError(null);
        setSuccess(null);
        const result = await initializeDefaultStatistics();
        if (result.success) {
            setSuccess('Default statistics initialized successfully!');
            await loadStatistics();
            setTimeout(() => setSuccess(null), 3000);
        }
        else {
            setError(`Failed to initialize defaults: ${result.error}`);
        }
        setSaving(null);
    };
    if (loading) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Statistics Editor" }), _jsx("div", { className: "text-center py-8", children: _jsx("div", { className: "text-gray-600", children: "Loading statistics..." }) })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Statistics Editor" }), _jsx("button", { onClick: handleInitializeDefaults, disabled: saving === 'initializing', className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed", children: saving === 'initializing' ? 'Initializing...' : 'Initialize Defaults' })] }), error && (_jsx("div", { className: "mb-4 p-4 bg-red-50 border border-red-200 rounded-md", children: _jsx("div", { className: "text-red-800 text-sm", children: error }) })), success && (_jsx("div", { className: "mb-4 p-4 bg-green-50 border border-green-200 rounded-md", children: _jsx("div", { className: "text-green-800 text-sm", children: success }) })), _jsx("div", { className: "space-y-6", children: statistics.map((stat) => (_jsx("div", { className: "border border-gray-200 rounded-lg p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Label" }), _jsx("input", { type: "text", value: stat.label, onChange: (e) => handleInputChange(stat.id, 'label', e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Value" }), _jsx("input", { type: "number", value: stat.value, onChange: (e) => handleInputChange(stat.id, 'value', e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Order" }), _jsx("input", { type: "number", value: stat.order, onChange: (e) => handleInputChange(stat.id, 'order', e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" })] }), _jsx("div", { className: "flex items-end", children: _jsx("button", { onClick: () => handleUpdateStatistic(stat), disabled: saving === stat.id, className: "w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed", children: saving === stat.id ? 'Saving...' : 'Save' }) })] }) }, stat.id))) }), _jsxs("div", { className: "mt-6 p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Instructions" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-1", children: [_jsx("li", { children: "\u2022 Edit the label, value, and order for each statistic" }), _jsx("li", { children: "\u2022 Click \"Save\" to update individual statistics" }), _jsx("li", { children: "\u2022 Use \"Initialize Defaults\" to reset to default values" }), _jsx("li", { children: "\u2022 Order determines the display sequence on the website" })] })] })] }));
};
export default StatisticsEditor;
