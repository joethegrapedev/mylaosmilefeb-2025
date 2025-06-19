import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signOutAdmin } from '../../firebase/auth';

const AdminConsole: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
    <div className="min-h-screen bg-bodyColor">
      <div className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-lightText">Admin Console</h1>
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-600 rounded-lg h-96 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-lightText mb-4">
                Admin Dashboard
              </h2>
              <p className="text-gray-400 mb-8">
                Welcome to the admin console. Here you can manage your website content and settings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-lightText mb-2">Content Management</h3>
                  <p className="text-gray-400 text-sm">Manage website content and updates</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-lightText mb-2">User Management</h3>
                  <p className="text-gray-400 text-sm">Manage user accounts and permissions</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-lightText mb-2">Analytics</h3>
                  <p className="text-gray-400 text-sm">View website analytics and reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;