import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getMissions, updateMission, addMission, deleteMission } from '../../firebase/missions';
const MissionsEditor = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newMission, setNewMission] = useState({
        date: '',
        location: '',
        description: '',
        order: 0
    });
    useEffect(() => {
        loadMissions();
    }, []);
    const loadMissions = async () => {
        try {
            setLoading(true);
            const data = await getMissions();
            setMissions(data);
            setError(null);
        }
        catch (err) {
            setError('Failed to load missions');
            console.error('Error loading missions:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = async (id, updatedMission) => {
        try {
            await updateMission(id, updatedMission);
            setMissions(missions.map(mission => mission.id === id ? { ...mission, ...updatedMission } : mission));
            setEditingId(null);
            setError(null);
        }
        catch (err) {
            setError('Failed to update mission');
            console.error('Error updating mission:', err);
        }
    };
    const handleAdd = async () => {
        try {
            const id = await addMission(newMission);
            const addedMission = { ...newMission, id };
            setMissions([...missions, addedMission]);
            setNewMission({ date: '', location: '', description: '', order: 0 });
            setIsAddingNew(false);
            setError(null);
        }
        catch (err) {
            setError('Failed to add mission');
            console.error('Error adding mission:', err);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this mission?')) {
            return;
        }
        try {
            await deleteMission(id);
            setMissions(missions.filter(mission => mission.id !== id));
            setError(null);
        }
        catch (err) {
            setError('Failed to delete mission');
            console.error('Error deleting mission:', err);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Missions Editor" }), _jsx("button", { onClick: () => setIsAddingNew(true), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors", children: "Add New Mission" })] }), error && (_jsx("div", { className: "mb-4 p-4 bg-red-50 border border-red-200 rounded-md", children: _jsx("p", { className: "text-red-800", children: error }) })), isAddingNew && (_jsxs("div", { className: "mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Add New Mission" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { type: "text", value: newMission.date, onChange: (e) => setNewMission({ ...newMission, date: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g., Feb 2025" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Location" }), _jsx("input", { type: "text", value: newMission.location, onChange: (e) => setNewMission({ ...newMission, location: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Mission location" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("input", { type: "text", value: newMission.description, onChange: (e) => setNewMission({ ...newMission, description: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g., 33 Surgeries delivered" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Order" }), _jsx("input", { type: "number", value: newMission.order, onChange: (e) => setNewMission({ ...newMission, order: parseInt(e.target.value) || 0 }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Display order" })] })] }), _jsxs("div", { className: "mt-4 flex gap-2", children: [_jsx("button", { onClick: handleAdd, className: "bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors", children: "Add Mission" }), _jsx("button", { onClick: () => {
                                    setIsAddingNew(false);
                                    setNewMission({ date: '', location: '', description: '', order: 0 });
                                }, className: "bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors", children: "Cancel" })] })] })), _jsx("div", { className: "space-y-4", children: missions.map((mission) => (_jsx(MissionCard, { mission: mission, isEditing: editingId === mission.id, onEdit: () => setEditingId(mission.id || null), onSave: handleSave, onCancel: () => setEditingId(null), onDelete: handleDelete }, mission.id))) }), missions.length === 0 && !loading && (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-500", children: "No missions found. Add your first mission above." }) }))] }));
};
const MissionCard = ({ mission, isEditing, onEdit, onSave, onCancel, onDelete, }) => {
    const [editedMission, setEditedMission] = useState({ ...mission });
    const handleSave = () => {
        onSave(mission.id || '', editedMission);
    };
    if (isEditing) {
        return (_jsxs("div", { className: "p-4 border border-gray-200 rounded-lg bg-white shadow-sm", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { type: "text", value: editedMission.date, onChange: (e) => setEditedMission({ ...editedMission, date: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Location" }), _jsx("input", { type: "text", value: editedMission.location, onChange: (e) => setEditedMission({ ...editedMission, location: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("input", { type: "text", value: editedMission.description, onChange: (e) => setEditedMission({ ...editedMission, description: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Order" }), _jsx("input", { type: "number", value: editedMission.order, onChange: (e) => setEditedMission({ ...editedMission, order: parseInt(e.target.value) || 0 }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), _jsxs("div", { className: "mt-4 flex gap-2", children: [_jsx("button", { onClick: handleSave, className: "bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors", children: "Save" }), _jsx("button", { onClick: onCancel, className: "bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors", children: "Cancel" })] })] }));
    }
    return (_jsx("div", { className: "p-4 border border-gray-200 rounded-lg bg-white shadow-sm", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-4 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: mission.location }), _jsx("span", { className: "text-sm text-gray-500", children: mission.date }), _jsxs("span", { className: "text-xs text-gray-400", children: ["Order: ", mission.order] })] }), _jsx("p", { className: "text-gray-700", children: mission.description })] }), _jsxs("div", { className: "flex gap-2 ml-4", children: [_jsx("button", { onClick: onEdit, className: "bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm", children: "Edit" }), _jsx("button", { onClick: () => onDelete(mission.id || ''), className: "bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm", children: "Delete" })] })] }) }));
};
export default MissionsEditor;
