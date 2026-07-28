import { useState, useEffect, useRef } from "react";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { getPublished } from "../firebase/content";
import { missionsDefault } from "../content/defaults/missions";

const Missions = () => {
  const [content, setContent] = useState(missionsDefault);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to parse date from mission title and return a comparable date
  const parseDate = (title: string): Date => {
    const monthYear = title.toLowerCase();
    const months = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
    };

    for (const [month, monthIndex] of Object.entries(months)) {
      if (monthYear.includes(month)) {
        const yearMatch = title.match(/\d{4}/);
        const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
        return new Date(year, monthIndex, 1);
      }
    }

    // Fallback: try to extract just the year
    const yearMatch = title.match(/\d{4}/);
    if (yearMatch) {
      return new Date(parseInt(yearMatch[0]), 0, 1);
    }

    return new Date(); // Default to current date
  };

  useEffect(() => {
    getPublished("missions", missionsDefault).then(setContent);
  }, []);

  // Sort missions by date (most recent first)
  const missions = [...content.items].sort((a, b) => {
    const dateA = parseDate(a.title);
    const dateB = parseDate(b.title);
    return dateB.getTime() - dateA.getTime();
  });

  // Auto-scroll to show the most recent mission when content loads
  useEffect(() => {
    if (missions.length > 0 && scrollContainerRef.current) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = 0; // Start at the beginning (most recent)
        }
      }, 100);
    }
  }, [missions.length]);

  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title
            title={content.title}
            des={content.des}
          />
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-6xl px-4">
            <h3 className="text-xl font-semibold mb-12 text-center text-gray-800">
              {content.timelineHeading}
            </h3>

            <div className="relative">
              {/* Continuous timeline line - positioned to align with dots */}
              <div className="absolute top-7 left-4 right-4 h-0.5 bg-gray-300 z-0"></div>

              {/* Horizontal scrollable timeline */}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto pb-6 scrollbar-hide timeline-container pt-4"
              >
                <div className="flex space-x-8 min-w-max px-4 relative">
                  {missions.map((mission, index) => (
                    <div key={mission.id} className="flex flex-col items-center min-w-[280px] relative timeline-item">
                      {/* Timeline dot */}
                      <div className="relative z-10">
                        <div className="w-6 h-6 bg-designColor rounded-full border-4 border-white shadow-lg relative">
                          {/* Highlight the most recent mission */}
                          {index === 0 && (
                            <div className="absolute -inset-2 bg-designColor rounded-full opacity-20 animate-pulse"></div>
                          )}
                        </div>
                      </div>

                      {/* Mission card */}
                      <div className={`mt-6 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 w-full max-w-[260px] border border-gray-200 ${
                        index === 0 ? 'ring-2 ring-designColor ring-opacity-30' : ''
                      }`}>
                        <div className="mb-3">
                          <h4 className="text-lg font-semibold text-gray-800 text-center">
                            {mission.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 text-center">{mission.description}</p>
                        {mission.reportUrl && (
                          <div className="flex justify-center">
                            <a
                              href={mission.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-designColor text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              View Report
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced scroll indicator */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Scroll to explore our mission timeline</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {missions.length === 0 && (
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
