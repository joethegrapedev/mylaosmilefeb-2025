// Initialize missions data through Firebase admin functions
import React, { useState } from 'react';
import { addMission } from '../../firebase/missions';

const InitializeMissions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const defaultMissions = [
    {
      date: "February 2025",
      location: "Vientiane, Laos",
      description: "Completed 33 life-changing cleft lip and palate surgeries for children and adults, transforming lives and bringing smiles to families across the capital.",
      order: 1
    },
    {
      date: "June 2024", 
      location: "Luang Prabang, Laos",
      description: "Successfully performed 8 complex reconstructive surgeries in the UNESCO World Heritage city, providing hope to rural communities.",
      order: 2
    },
    {
      date: "March 2024",
      location: "Savannakhet, Laos", 
      description: "Delivered 23 surgeries in southern Laos, including training local medical staff in cleft care techniques and post-operative care.",
      order: 3
    },
    {
      date: "October 2023",
      location: "Pakse, Laos",
      description: "Conducted 28 surgeries during our largest mission to date, establishing partnerships with local hospitals for ongoing patient care.",
      order: 4
    },
    {
      date: "February 2023",
      location: "Vientiane, Laos", 
      description: "Performed 17 surgeries while launching our community outreach program to identify and support more children in need of care.",
      order: 5
    }
  ];

  const initializeMissions = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      for (const mission of defaultMissions) {
        await addMission(mission);
        console.log(`Added mission: ${mission.location} (${mission.date})`);
      }
      setMessage('✅ All missions initialized successfully!');
    } catch (error) {
      console.error('Error initializing missions:', error);
      setMessage('❌ Error initializing missions. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Initialize Default Missions Data</h3>
      <p className="text-sm text-gray-600 mb-4">
        This will add default missions data to Firebase. Only run this once!
      </p>
      <button
        onClick={initializeMissions}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded"
      >
        {loading ? 'Initializing...' : 'Initialize Missions'}
      </button>
      {message && (
        <div className="mt-4 p-2 rounded bg-white">
          {message}
        </div>
      )}
    </div>
  );
};

export default InitializeMissions;
