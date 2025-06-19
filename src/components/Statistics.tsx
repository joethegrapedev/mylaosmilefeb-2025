import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe } from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";
import Card from "./Card";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getStatistics, Statistic } from "../firebase/statistics";

const Feature = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
    { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
    { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Temporarily disable Firebase loading to debug
  // useEffect(() => {
  //   const fetchStatistics = async () => {
  //     try {
  //       const stats = await getStatistics();
  //       setStatistics(stats);
  //       setError(null);
  //     } catch (error) {
  //       console.error('Error loading statistics:', error);
  //       setError('Failed to load statistics');
  //       // Set fallback statistics
  //       setStatistics([
  //         { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
  //         { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
  //         { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
  //       ]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStatistics();
  // }, []);

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
              <div className="text-center text-gray-600">Loading statistics...</div>
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
          </div>
        </section>
      </FadeIn>
    </section>
  );
};

export default Feature;
