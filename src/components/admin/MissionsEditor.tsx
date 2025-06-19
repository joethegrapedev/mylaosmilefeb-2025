import React, { useState, useEffect } from 'react';
import { Mission, getMissions, updateMission, addMission, deleteMission } from '../../firebase/missions';

const MissionsEditor: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [newMission, setNewMission] = useState<Omit<Mission, 'id'>>({
    title: '',
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
      setNewMission({ title: '', location: '', description: '', order: 0 });
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
            
            <div className="md:col-span-1">
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
                setNewMission({ title: '', location: '', description: '', order: 0 });
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
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
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
              Location
            </label>
            <input
              type="text"
              value={editedMission.location}
              onChange={(e) => setEditedMission({ ...editedMission, location: e.target.value })}
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
            <span className="text-sm text-gray-500">{mission.location}</span>
            <span className="text-xs text-gray-400">Order: {mission.order}</span>
          </div>
          <p className="text-gray-700">{mission.description}</p>
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
