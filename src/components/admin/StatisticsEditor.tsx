import React, { useState, useEffect } from 'react';
import { getStatistics, updateStatistic, initializeDefaultStatistics, Statistic } from '../../firebase/statistics';

const StatisticsEditor: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const stats = await getStatistics();
      setStatistics(stats);
    } catch (error: any) {
      setError('Failed to load statistics: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatistic = async (stat: Statistic) => {
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
    } else {
      setError(`Failed to update ${stat.label}: ${result.error}`);
    }
    
    setSaving(null);
  };

  const handleInputChange = (id: string, field: keyof Statistic, value: string | number) => {
    setStatistics(prev => 
      prev.map(stat => 
        stat.id === id 
          ? { ...stat, [field]: field === 'value' || field === 'order' ? Number(value) : value }
          : stat
      )
    );
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
    } else {
      setError(`Failed to initialize defaults: ${result.error}`);
    }
    
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistics Editor</h2>
        <div className="text-center py-8">
          <div className="text-gray-600">Loading statistics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Statistics Editor</h2>
        <button
          onClick={handleInitializeDefaults}
          disabled={saving === 'initializing'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving === 'initializing' ? 'Initializing...' : 'Initialize Defaults'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-800 text-sm">{error}</div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="text-green-800 text-sm">{success}</div>
        </div>
      )}

      <div className="space-y-6">
        {statistics.map((stat) => (
          <div key={stat.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleInputChange(stat.id, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => handleInputChange(stat.id, 'value', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={stat.order}
                  onChange={(e) => handleInputChange(stat.id, 'order', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => handleUpdateStatistic(stat)}
                  disabled={saving === stat.id}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving === stat.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Instructions</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Edit the label, value, and order for each statistic</li>
          <li>• Click "Save" to update individual statistics</li>
          <li>• Use "Initialize Defaults" to reset to default values</li>
          <li>• Order determines the display sequence on the website</li>
        </ul>
      </div>
    </div>
  );
};

export default StatisticsEditor;
