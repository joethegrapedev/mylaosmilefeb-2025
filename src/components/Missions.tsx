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
          { id: '1', title: "February 2025", description: "33 Surgeries delivered", order: 1, reportUrl: undefined, reportFileName: undefined },
          { id: '2', title: "June 2024", description: "8 Surgeries delivered", order: 2, reportUrl: undefined, reportFileName: undefined },
          { id: '3', title: "March 2024", description: "23 Surgeries delivered", order: 3, reportUrl: undefined, reportFileName: undefined },
          { id: '4', title: "October 2023", description: "28 Surgeries delivered", order: 4, reportUrl: undefined, reportFileName: undefined },
          { id: '5', title: "February 2023", description: "17 Surgeries delivered", order: 5, reportUrl: undefined, reportFileName: undefined },
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
                  <div className="mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{mission.title}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{mission.description}</p>
                  {mission.reportUrl && (
                    <div className="mt-auto">
                      <a
                        href={mission.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Mission Report
                      </a>
                    </div>
                  )}
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
