import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getMissions, updateMission, addMission, deleteMission, uploadMissionFile, updateMissionWithFile, deleteMissionFile } from '../../firebase/missions';
const MissionsEditor = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newMission, setNewMission] = useState({
        title: '',
        description: '',
        order: 0
    });
    const [uploadingFiles, setUploadingFiles] = useState(new Set());
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
            setNewMission({ title: '', description: '', order: 0 });
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
    const handleFileUpload = async (missionId, file) => {
        if (!file.type.includes('pdf')) {
            setError('Only PDF files are allowed');
            return;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError('File size must be less than 10MB');
            return;
        }
        try {
            setUploadingFiles(prev => new Set(prev).add(missionId));
            setError(null);
            const { url, fileName, storageFileName } = await uploadMissionFile(file, missionId);
            await updateMissionWithFile(missionId, {
                reportUrl: url,
                reportFileName: fileName,
                storageFileName: storageFileName
            });
            // Update local state
            setMissions(missions.map(mission => mission.id === missionId
                ? { ...mission, reportUrl: url, reportFileName: fileName, storageFileName: storageFileName }
                : mission));
            setUploadingFiles(prev => {
                const next = new Set(prev);
                next.delete(missionId);
                return next;
            });
        }
        catch (err) {
            console.error('Error uploading file:', err);
            setError('Failed to upload file');
            setUploadingFiles(prev => {
                const next = new Set(prev);
                next.delete(missionId);
                return next;
            });
        }
    };
    const handleFileDelete = async (missionId, storageFileName) => {
        if (!window.confirm('Are you sure you want to delete this report?')) {
            return;
        }
        try {
            console.log('handleFileDelete called with:', { missionId, storageFileName });
            // Find the mission to get all file info
            const mission = missions.find(m => m.id === missionId);
            console.log('Mission data:', mission);
            // If we don't have storageFileName, try to extract it from the URL
            let fileName = storageFileName;
            if (!fileName && mission?.reportUrl) {
                // Try to extract filename from the download URL
                const url = mission.reportUrl;
                const match = url.match(/mission-reports%2F([^?&]+)/);
                if (match) {
                    fileName = decodeURIComponent(match[1]);
                    console.log('Extracted filename from URL:', fileName);
                }
            }
            if (!fileName) {
                throw new Error('Cannot determine file to delete');
            }
            // Clean up the filename - remove any query parameters
            if (fileName.includes('?')) {
                fileName = fileName.split('?')[0];
            }
            // Extract the actual filename from path if needed
            if (fileName.includes('mission-reports/')) {
                fileName = fileName.split('mission-reports/')[1];
            }
            else if (fileName.includes('%2F')) {
                fileName = fileName.split('%2F')[1];
            }
            console.log('Final filename for deletion:', fileName);
            await deleteMissionFile(fileName);
            await updateMissionWithFile(missionId, {
                reportUrl: '',
                reportFileName: '',
                storageFileName: ''
            });
            // Update local state
            setMissions(missions.map(mission => mission.id === missionId
                ? { ...mission, reportUrl: undefined, reportFileName: undefined, storageFileName: undefined }
                : mission));
            setError(null);
        }
        catch (err) {
            console.error('Error deleting file:', err);
            setError('Failed to delete file');
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Missions Editor" }), _jsx("button", { onClick: () => setIsAddingNew(true), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors", children: "Add New Mission" })] }), error && (_jsx("div", { className: "mb-4 p-4 bg-red-50 border border-red-200 rounded-md", children: _jsx("p", { className: "text-red-800", children: error }) })), isAddingNew && (_jsxs("div", { className: "mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Add New Mission" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Title" }), _jsx("input", { type: "text", value: newMission.title, onChange: (e) => setNewMission({ ...newMission, title: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g., February 2025 Mission" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Order" }), _jsx("input", { type: "number", value: newMission.order, onChange: (e) => setNewMission({ ...newMission, order: parseInt(e.target.value) || 0 }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Display order" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("input", { type: "text", value: newMission.description, onChange: (e) => setNewMission({ ...newMission, description: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g., 33 Surgeries delivered" })] })] }), _jsxs("div", { className: "mt-4 flex gap-2", children: [_jsx("button", { onClick: handleAdd, className: "bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors", children: "Add Mission" }), _jsx("button", { onClick: () => {
                                    setIsAddingNew(false);
                                    setNewMission({ title: '', description: '', order: 0 });
                                }, className: "bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors", children: "Cancel" })] })] })), _jsx("div", { className: "space-y-4", children: missions.map((mission) => (_jsx(MissionCard, { mission: mission, isEditing: editingId === mission.id, onEdit: () => setEditingId(mission.id || null), onSave: handleSave, onCancel: () => setEditingId(null), onDelete: handleDelete, onFileUpload: handleFileUpload, onFileDelete: handleFileDelete, uploadingFiles: uploadingFiles }, mission.id))) }), missions.length === 0 && !loading && (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-500", children: "No missions found. Add your first mission above." }) }))] }));
};
const MissionCard = ({ mission, isEditing, onEdit, onSave, onCancel, onDelete, onFileUpload, onFileDelete, uploadingFiles, }) => {
    const [editedMission, setEditedMission] = useState({ ...mission });
    const handleSave = () => {
        onSave(mission.id || '', editedMission);
    };
    if (isEditing) {
        return (_jsxs("div", { className: "p-4 border border-gray-200 rounded-lg bg-white shadow-sm", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Title" }), _jsx("input", { type: "text", value: editedMission.title, onChange: (e) => setEditedMission({ ...editedMission, title: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Order" }), _jsx("input", { type: "number", value: editedMission.order, onChange: (e) => setEditedMission({ ...editedMission, order: parseInt(e.target.value) || 0 }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("input", { type: "text", value: editedMission.description, onChange: (e) => setEditedMission({ ...editedMission, description: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), _jsxs("div", { className: "mt-4 flex gap-2", children: [_jsx("button", { onClick: handleSave, className: "bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors", children: "Save" }), _jsx("button", { onClick: onCancel, className: "bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors", children: "Cancel" })] })] }));
    }
    return (_jsx("div", { className: "p-4 border border-gray-200 rounded-lg bg-white shadow-sm", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-4 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: mission.title }), _jsxs("span", { className: "text-xs text-gray-400", children: ["Order: ", mission.order] })] }), _jsx("p", { className: "text-gray-700", children: mission.description }), _jsxs("div", { className: "mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Mission Report (PDF only, max 10MB)" }), !mission.reportUrl && (_jsx("input", { type: "file", accept: "application/pdf", onChange: (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            onFileUpload(mission.id || '', file);
                                            e.target.value = ''; // Reset input
                                        }
                                    }, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm", disabled: uploadingFiles.has(mission.id || '') })), mission.reportUrl && (_jsxs("div", { className: "flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 text-green-600 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsxs("span", { className: "text-sm text-green-800", children: ["Report uploaded: ", mission.reportFileName] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("a", { href: mission.reportUrl, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-blue-600 hover:underline", children: "View" }), _jsx("button", { onClick: () => onFileDelete(mission.id || '', mission.storageFileName || mission.reportUrl || ''), className: "text-sm text-red-600 hover:underline", children: "Delete" })] })] })), uploadingFiles.has(mission.id || '') && (_jsxs("div", { className: "flex items-center text-sm text-blue-600 mt-2", children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Uploading file..."] }))] })] }), _jsxs("div", { className: "flex gap-2 ml-4", children: [_jsx("button", { onClick: onEdit, className: "bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm", children: "Edit" }), _jsx("button", { onClick: () => onDelete(mission.id || ''), className: "bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm", children: "Delete" })] })] }) }));
};
export default MissionsEditor;
