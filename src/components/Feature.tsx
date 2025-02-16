import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe } from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";
import Card from "./Card";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import {motion} from "framer-motion";

// IMPORTANT NUMBER OF SURGERIES STATS ETC ALL HERE JUST EDIT DIRECTLY FOR NOW


const statistics = [
  { label: 'Surgeries Delivered', value: 102 },
  { label: 'Active Volunteers', value: 34 },
  { label: 'Medical Missions', value: 5 },
]


// number of surgeries, active volunteers, medical missions above

const Feature = () => {
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
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // className="bg-white p-8 rounded-lg shadow-md text-center"
            >
  {/* CONTROL THE COLOR OF THE STATS IN THE LINE BELOW, SET IT TO GRAY FOR NOW */}
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
