import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signOutAdmin } from '../../firebase/auth';
import StatisticsEditor from './StatisticsEditor';
import MissionsEditor from './MissionsEditor';

const AdminConsole: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'statistics' | 'missions'>('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
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
    return (
      <div className="min-h-screen bg-bodyColor flex items-center justify-center">
        <div className="text-lightText">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white">Admin Console</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'statistics'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('missions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'missions'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Missions
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && (
            <div className="border-4 border-dashed border-gray-600 rounded-lg h-96 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Admin Dashboard
                </h2>
                <p className="text-gray-400 mb-8">
                  Welcome to the admin console. Here you can manage your website content and settings.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">Statistics</h3>
                    <p className="text-gray-400 text-sm mb-4">Manage website statistics and numbers</p>
                    <button 
                      onClick={() => setActiveTab('statistics')}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit Statistics →
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">Missions</h3>
                    <p className="text-gray-400 text-sm mb-4">Manage mission history and updates</p>
                    <button 
                      onClick={() => setActiveTab('missions')}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit Missions →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <StatisticsEditor />
          )}

          {activeTab === 'missions' && (
            <MissionsEditor />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;