import Title from "./Title";
// import ProjectsCard from "./ProjectsCard";
// import { projectOne, projectThree, projectTwo } from "../assets";
import { FadeIn } from "./FadeIn";


interface Mission {
  id: number
  date: string
  location: string
  description: string
}


       {/* INFORMATION ABOUT THE DIFFERENT MISSIONS BELOW */}
       const missions: Mission[] = [
        { id: 1, date: " ", location: "Feb 2025", description: "33 Surgeries delivered" },
        { id: 2, date: " ", location: "June 2024", description: "8 Surgeries delivered" },
        { id: 3, date: " ", location: "Mar 2024", description: "23 Surgeries delivered" },
        { id: 4, date: " ", location: "Oct 2023", description: "28 Surgeries delivered" },
        { id: 5, date: " ", location: "Feb 2023", description: "17 Surgeries delivered" },
      ] 
        {/* INFORMATION ABOUT THE DIFFERENT MISSIONS ABOVE */}


        


const Projects = () => {
  return (


    
    <section className= "bg-center"
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title
            title="What we do"
            des="Missions"
          />
        </div>
<div>
<div className="md:w-3/4">
            <h3 className="text-xl font-semibold mb-4">
              Latest Missions as of {("11 Feb 2025")}
            </h3>
            <ul className="space-y-4">
              {missions.map((mission) => (
                <li key={mission.id} className="bg-white shadow rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{mission.location}</h4>
                    <span className="text-sm text-gray-500"></span>
                  </div>
                  <p className="text-gray-700">{mission.description}</p>
                </li>
              ))}
            </ul>
          </div>
</div>
      </FadeIn>
    </section>
  );
  
};

export default Projects;
