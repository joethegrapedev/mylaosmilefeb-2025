import React, { useState } from 'react';
import Title from './Title';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Achievement from './Achievement';
import { Tab } from '@headlessui/react';
import { FadeIn } from './FadeIn';
import Pic1 from "../assets/images/Cordelia.jpeg"

const teamppl = {
  Surgeons: [
    "Kuek Bak Kim Leslie",
    "Por Yong Chen",
    "Wu Tze Liang Woffles",
    "Michael Hsieh Ku-Hung",
    "Robert Yap Tze Jin",
    "Lim Jue Shuang Gale",
    "Savitha Ramachandran",
    "Cai Zhengyang Elijah",
    "Ang Shu Yan Divya",
    "Lai Yu Ming",
    "Loh Mei Ling"
  ],
  Anaesthetists: [
    "Lim Hsien Jer",
    "Tan Swee Kim Josephine",
    "Tan Geok Mui",
    "Davies Lucy Jennifer",
    "Rachael Peirera",
    "Claire Ang Sze Teng",
    "Neo Hong Jye",
    "Ng Bang Teen",
    "Philip Tseng Seng Sou",
    "Stephanie Glarbo Jia Xing",
    "Angela Tan Yun June",
    "Yap Si Hui",
    "Chia Xian Qing Pamela",
    "Ma Wai Wai Zaw",
    "Jonathan See"
  ],
  Orthodontist: [
    "Catherine Lee Tong How"
  ],
  Nurses: [
    "Ong ShiHui", "Lew Lian Choo", "Cassandra Leong", "Ho Liping  Michelle",
    "Chua Sin Yee", "Cordelia Xavier", "Ng Sau Foong", "Yvonne Yap Yan Yan",
    "Manoranjitham Harikrishnan", "Sheena Wong Xiu Wen", "Nur Diyana Binte Jamial",
    "Tan Hwee Min"
  ],
  "Speech Therapist": ["Jasmin Teo Lee Ping"],
  "Photographer / Web designer": ["John Tow"],
  "Local Nurses and Doctors": ["Thank you for all who have supported our mission."],
}

const teamMembers = {
  leaders: [
    { 
      name: "Dr. Leslie Kuek", 
      role: "Mission Leader", 
      image: "https://www.farrerpark.com/dam/jcr:5f16b4d2-012c-4bf3-9062-974f94ac7b5e/LeslieKuek.jpg" // Direct URL to the image
    },
    { 
      name: "Nurse Cordelia", 
      role: "Mission Coordinator", 
      image: Pic1
    },
    { 
      name: "Prof. Lee Seng Teik", 
      role: "Founder/Advisor", 
      image: "https://mindfulnessacademy.org/images/events/conferences/2015-MTeachers/speakers/LeeSengTeik-pt.jpg" 
    },
    { 
      name: "Dr. Woffles Wu", 
      role: "Senior Plastic Surgeon/Team Leader", 
      image: "https://www.woffleswu.com/wp-content/uploads/2020/06/AN-EYELID-FOR-BEAUTY-cover.jpg" 
    },
  ],
  // surgeons: [
  //   { name: "Dr. Emily Chen", image: "/src/assets/images/people/surgeons/emily-chen.jpg" },
  //   { name: "Dr. Michael Wong", image: "/src/assets/images/people/surgeons/michael-wong.jpg" },
  //   { name: "Dr. Sarah Johnson", image: "/src/assets/images/people/surgeons/sarah-johnson.jpg" },
  // ],
  // nursesAndVolunteers: [
  //   { name: "Maria Garcia", image: "/src/assets/images/people/nurses&volunteers/maria-garcia.jpg" },
  //   { name: "David Lee", image: "/src/assets/images/people/nurses&volunteers/david-lee.jpg" },
  //   { name: "Emma Wilson", image: "/src/assets/images/people/nurses&volunteers/emma-wilson.jpg" },
  //   { name: "Alex Tan", image: "/src/assets/images/people/nurses&volunteers/alex-tan.jpg" },
  // ],
};




const Resume = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  //  <section
  //      id="features"
  //      className="w-full py-20 border-b-[1px] border-b-gray-700"
  //  ></section>
  return (
    <section
      id="Resume"
      className="w-full py-20 border-b-[1px] border-b-gray-700">
        <FadeIn>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Story</h1>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/2 aspect-video relative">
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Loading video...</p>
              </div>
            )}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/_dih2JOb2C8" // Direct URL to the video
              title="MyLaoSmile Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
              className={`absolute inset-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            ></iframe>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">The History of MyLaoSmile</h2>
            <p className="text-gray-700 mb-4">
            The MyLaoSMILE project was started in 2023 by Prof. Lee Seng Teik and is now led by Dr Leslie Kuek and Dr. Woffles Wu. With the support of many medical professionals from Singapore, the team strives to continue restore basic human functions to children in Laos which every child should enjoy. 
           </p>
           <p className="text-gray-700 mb-4">
In partnership with Lao Friends Hospital for Children, the surgical team has fostered many connections and works together to provide free reconstructive surgeries that help children eat, speak, and smile without fear. Our team performs a wide range of procedures including cleft lip repair, cleft palate repair, burns contracture scar release and congenital hand surgery.

</p>
           <p className="text-gray-700 mb-4">  </p>
           <p className="text-gray-700 mb-4">Beyond surgery, the team is deeply committed to making a lasting impact by training local doctors, equipping them with the skills and knowledge to continue treating cleft conditions. This ensures that future generations of children will receive the care they need long after the mission ends.
</p>
          </div>
        </div>


        {/* Foreword Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Foreword</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              It was four years ago in 2019 that I received a request from Dr Lisa Rynn, Medical Director of Lao Friends Hospital for Children (LFHC) for specialist medical help for the children in Luang Prabang Province of Lao PDR. There were many children with cleft lip and palate condition and post-burns contractures who required specialised plastic and reconstructive surgery.
            </p>
            <p className="mb-4">
              In 2020, this request for a humanitarian mission to LFHC was approved by SGH (Singapore General Hospital) Medical Board using the SGH Health Development Fund under SGH Cleft Missions-Laos account. Unfortunately, due to the onset of the COVID-19 pandemic, this mission had to be postponed until travel restrictions were lifted in 2023 after a lapse of 3 years.
            </p>
            <p className="mb-4">
              In 2022, we decided to conduct a recce mission to find out the status of patients at LFHC, to view for ourselves the operating facilities at LFHC, and also to meet with the new management of the children's hospital. This recce mission took place 26 – 29th November 2022, and the key personnel (3 surgeons and 1 OT nurse) undertook this trip.
            </p>
            <p className="mb-4">
              On 20th December 2022, I received a formal request from the new Medical Director of LFHC, Dr Thomas Brune, for assistance with cleft lip and palate, and post-burns patients who were in need of reconstructive surgery. Due to the COVID-19 pandemic, there had been a backlog of patients. I sought immediate support for the team to be reactivated and the approval was promptly given by Chairman Medical Board as well as Chief Nurse of SGH.
            </p>
            <p className="mb-4">
              So the task of assembling the team of volunteer doctors (surgeons and anaesthetists) as well as OT and ward nurses started. The dates of the mission were set for 23rd Feb 2023 to 2nd March 2023 and the logistics of organising the mission was done actively by the team members themselves. Internet communication helped but the team of 13 members met twice to smooth out all the organisational details of the mission.
            </p>
            <p className="mb-6">
              This report provides insights to the work done, the working conditions and the challenges we faced, yet expertly overcome. It also speaks volumes of the love, dedication and professionalism of our volunteer doctors, dentist, and nurses, not to mention the warmth and welcome of the Laotian people, and our collaboration with the staff of LFHC.
            </p>
            <div className="text-right">
              <p className="font-semibold">Dr Lee Seng Teik</p>
              <p className="text-sm text-gray-600">Chef de Mission</p>
              <p className="text-sm text-gray-600">Clinical Professor and Emeritus Consultant</p>
              <p className="text-sm text-gray-600">Department of Plastic, Reconstructive & Aesthetic Surgery</p>
              <p className="text-sm text-gray-600">Singapore General Hospital</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        {Object.keys(teamMembers).map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 capitalize text-center">{category.replace(/([A-Z])/g, ' $1')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teamMembers[category].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-lg object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = 'fallback-image-url'; // Optional: Add a fallback image URL
                        e.currentTarget.alt = 'Fallback Image';
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  {member.role && (
                    <p className="text-gray-600">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-6">Our Team</h2>
      <div className="flex flex-col items-center space-y-8">
        {Object.entries(teamppl).map(([role, members]) => (
          <div key={role} className="w-full max-w-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">{role}</h3>
            <ul className="space-y-1">
              {members.map((member, index) => (
                <li key={index} className="text-gray-700">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
        
      
      </FadeIn>
    </section>
  );
};

export default Resume;  
