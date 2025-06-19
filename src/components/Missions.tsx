import React, { useState, useEffect } from "react";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { Mission, getMissions } from "../firebase/missions";

const Missions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const data = await getMissions();
        setMissions(data);
      } catch (err) {
        console.error('Error loading missions:', err);
        setError('Failed to load missions');
        // Fallback to static data if Firebase fails
        setMissions([
          { id: '1', title: "February 2025", location: "Vientiane", description: "33 Surgeries delivered", order: 1 },
          { id: '2', title: "June 2024", location: "Luang Prabang", description: "8 Surgeries delivered", order: 2 },
          { id: '3', title: "March 2024", location: "Savannakhet", description: "23 Surgeries delivered", order: 3 },
          { id: '4', title: "October 2023", location: "Pakse", description: "28 Surgeries delivered", order: 4 },
          { id: '5', title: "February 2023", location: "Vientiane", description: "17 Surgeries delivered", order: 5 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  if (loading) {
    return (
      <section 
        id="missions"
        className="bg-center w-full py-20 border-b-[1px] border-b-gray-700"
      >
        <FadeIn>
          <div className="flex justify-center items-center text-center">
            <Title
              title="What we do"
              des="Missions"
            />
          </div>
          <div className="flex justify-center items-center mt-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-designColor mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading missions...</p>
            </div>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <section 
      id="missions"
      className="bg-center w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title
            title="What we do"
            des="Missions"
          />
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-4xl px-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
              Our Recent Missions
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {missions.map((mission) => (
                <div key={mission.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{mission.title}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{mission.location}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{mission.description}</p>
                </div>
              ))}
            </div>
            {missions.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-600">No missions found.</p>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Missions;
