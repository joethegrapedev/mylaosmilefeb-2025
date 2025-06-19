import React, { useState, useEffect } from 'react';
import { Mission, getMissions, updateMission, addMission, deleteMission, uploadMissionFile, updateMissionWithFile, deleteMissionFile } from '../../firebase/missions';

const MissionsEditor: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [newMission, setNewMission] = useState<Omit<Mission, 'id'>>({
    title: '',
    description: '',
    order: 0
  });

  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const data = await getMissions();
      setMissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load missions');
      console.error('Error loading missions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string, updatedMission: Partial<Mission>) => {
    try {
      await updateMission(id, updatedMission);
      setMissions(missions.map(mission => 
        mission.id === id ? { ...mission, ...updatedMission } : mission
      ));
      setEditingId(null);
      setError(null);
    } catch (err) {
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
    } catch (err) {
      setError('Failed to add mission');
      console.error('Error adding mission:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this mission?')) {
      return;
    }

    try {
      await deleteMission(id);
      setMissions(missions.filter(mission => mission.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete mission');
      console.error('Error deleting mission:', err);
    }
  };

  const handleFileUpload = async (missionId: string, file: File) => {
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

      const { url, fileName } = await uploadMissionFile(file, missionId);
      await updateMissionWithFile(missionId, { 
        reportUrl: url, 
        reportFileName: fileName 
      });

      // Update local state
      setMissions(missions.map(mission => 
        mission.id === missionId 
          ? { ...mission, reportUrl: url, reportFileName: fileName }
          : mission
      ));

      setUploadingFiles(prev => {
        const next = new Set(prev);
        next.delete(missionId);
        return next;
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file');
      setUploadingFiles(prev => {
        const next = new Set(prev);
        next.delete(missionId);
        return next;
      });
    }
  };

  const handleFileDelete = async (missionId: string, storageFileName: string) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      // Extract the actual filename from the Firebase Storage URL if needed
      let fileName = storageFileName;
      if (storageFileName.includes('mission-reports/')) {
        fileName = storageFileName.split('mission-reports/')[1];
      } else if (storageFileName.includes('%2F')) {
        fileName = storageFileName.split('%2F')[1];
      }
      
      await deleteMissionFile(fileName);
      
      await updateMissionWithFile(missionId, { 
        reportUrl: '', 
        reportFileName: '' 
      });

      // Update local state
      setMissions(missions.map(mission => 
        mission.id === missionId 
          ? { ...mission, reportUrl: undefined, reportFileName: undefined }
          : mission
      ));

      setError(null);
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('Failed to delete file');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Missions Editor</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Mission
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Add New Mission Form */}
      {isAddingNew && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Add New Mission</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newMission.title}
                onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., February 2025 Mission"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={newMission.order}
                onChange={(e) => setNewMission({ ...newMission, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Display order"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newMission.description}
                onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 33 Surgeries delivered"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Mission
            </button>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setNewMission({ title: '', description: '', order: 0 });
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Missions List */}
      <div className="space-y-4">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            isEditing={editingId === mission.id}
            onEdit={() => setEditingId(mission.id || null)}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
            onDelete={handleDelete}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            uploadingFiles={uploadingFiles}
          />
        ))}
      </div>

      {missions.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No missions found. Add your first mission above.</p>
        </div>
      )}
    </div>
  );
};

interface MissionCardProps {
  mission: Mission;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (id: string, updatedMission: Partial<Mission>) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onFileUpload: (missionId: string, file: File) => void;
  onFileDelete: (missionId: string, storageFileName: string) => void;
  uploadingFiles: Set<string>;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFileUpload,
  onFileDelete,
  uploadingFiles,
}) => {
  const [editedMission, setEditedMission] = useState<Mission>({ ...mission });

  const handleSave = () => {
    onSave(mission.id || '', editedMission);
  };

  if (isEditing) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editedMission.title}
              onChange={(e) => setEditedMission({ ...editedMission, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <input
              type="number"
              value={editedMission.order}
              onChange={(e) => setEditedMission({ ...editedMission, order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={editedMission.description}
              onChange={(e) => setEditedMission({ ...editedMission, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{mission.title}</h3>
            <span className="text-xs text-gray-400">Order: {mission.order}</span>
          </div>
          <p className="text-gray-700">{mission.description}</p>
          {/* File upload section */}
          <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mission Report (PDF only, max 10MB)
            </label>
            {!mission.reportUrl && (
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onFileUpload(mission.id || '', file);
                    e.target.value = ''; // Reset input
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={uploadingFiles.has(mission.id || '')}
              />
            )}
            {mission.reportUrl && (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-green-800">Report uploaded: {mission.reportFileName}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={mission.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>
                  <button
                    onClick={() => onFileDelete(mission.id || '', mission.reportFileName || '')}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            {uploadingFiles.has(mission.id || '') && (
              <div className="flex items-center text-sm text-blue-600 mt-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading file...
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={onEdit}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(mission.id || '')}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionsEditor;
