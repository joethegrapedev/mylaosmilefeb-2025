import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPublished } from "../firebase/content";
import { statisticsDefault } from "../content/defaults/statistics";

const Statistics = () => {
  const [content, setContent] = useState(statisticsDefault);

  useEffect(() => {
    getPublished("statistics", statisticsDefault).then(setContent);
  }, []);

  const items = [...content.items].sort((a, b) => a.order - b.order);

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
              {items.map((stat, index) => (
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
            {items.length === 0 && (
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
