import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getStatistics, Statistic } from "../firebase/statistics";

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const stats = await getStatistics();
        setStatistics(stats);
        setError(null);
      } catch (error) {
        console.error('Error loading statistics:', error);
        setError('Failed to load statistics');
        // Set fallback statistics
        setStatistics([
          { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
          { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
          { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <section
        id="features"
        className="w-full py-20 border-b-[1px] border-b-gray-700"
      >
        <FadeIn>
          <Title title="Statistics" des="" />
          <section className="bg-gray-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-designColor mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading statistics...</p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </section>
    );
  }

  return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title="Statistics" des="" />
        <section className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold text-primary mb-2 text-gray-700">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xl text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            {statistics.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-600">No statistics found.</p>
              </div>
            )}
          </div>
        </section>
      </FadeIn>
    </section>
  );
};

export default Statistics;
