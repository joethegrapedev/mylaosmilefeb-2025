import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FadeIn } from './FadeIn';
import Pic1 from "../assets/images/Cordelia.jpeg";
const teamppl = {
    Doctors: ["Kuek Bak Kim Leslie", "Por Yong Chen", "Wu Tze Liang Woffles", "Michael Hsieh Ku-Hung", "Robert Yap Tze Jin", "Lim Jue Shuang Gale", "Savitha Ramachandran", "Cai Zhengyang Elijah", "Ang Shu Yan Divya", "Lai Yu Ming", "Loh Mei Ling", "Lim Hsien Jer", "Tan Swee Kim Josephine", "Tan Geok Mui", "Davies Lucy Jennifer", "Rachael Peirera", "Claire Ang Sze Teng", "Neo Hong Jye", "Ng Bang Teen", "Philip Tseng Seng Sou", "Stephanie Glarbo Jia Xing", "Angela Tan Yun June", "Yap Si Hui", "Ma Wai Wai Zaw", "Catherine Lee Tong How", "Jonathan See"],
    Nurses: [
        "Ong ShiHui", "Lew Lian Choo", "Cassandra Leong", "Ho Liping  Michelle",
        "Chua Sin Yee", "Cordelia Xavier", "Ng Sau Foong", "Yvonne Yap Yan Yan",
        "Manoranjitham Harikrishnan", "Sheena Wong Xiu Wen", "Nur Diyana Binte Jamial",
        "Tan Hwee Min"
    ], "Speech Therapist": ["Jasmin Teo Lee Ping"],
    "Photographer / Web designer": ["John Tow"],
};
const teamMembers = {
    leaders: [
        {
            name: "Dr. Leslie Kuek",
            role: "Team Leader",
            image: "https://www.farrerpark.com/dam/jcr:5f16b4d2-012c-4bf3-9062-974f94ac7b5e/LeslieKuek.jpg" // Direct URL to the image
        },
        {
            name: "Nurse Cordelia",
            role: "Lead Nurse",
            image: Pic1
        },
        {
            name: "Prof. Lee Seng Teik",
            role: "Founder",
            image: "https://mindfulnessacademy.org/images/events/conferences/2015-MTeachers/speakers/LeeSengTeik-pt.jpg"
        },
        {
            name: "Dr. Woffles Wu",
            role: "Lead Plastic Surgeon",
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
    return (_jsx("section", { id: "Resume", className: "w-full py-20 border-b-[1px] border-b-gray-700", children: _jsxs(FadeIn, { children: [_jsxs("div", { className: "container mx-auto py-12", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-12", children: "Our Story" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-8 mb-16", children: [_jsxs("div", { className: "w-full md:w-1/2 aspect-video relative", children: [!videoLoaded && (_jsx("div", { className: "absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center", children: _jsx("p", { className: "text-gray-500", children: "Loading video..." }) })), _jsx("iframe", { width: "100%", height: "100%", src: "https://www.youtube.com/embed/_dih2JOb2C8" // Direct URL to the video
                                            , title: "MyLaoSmile Story", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, onLoad: () => setVideoLoaded(true), className: `absolute inset-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'}` })] }), _jsxs("div", { className: "w-full md:w-1/2", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "The History of MyLaoSmile" }), _jsx("p", { className: "text-gray-700 mb-4", children: "The MyLaoSMILE project was started in 2023 by Prof. Lee Seng Teik and is now led by Dr Leslie Kuek and Dr. Woffles Wu. With the support of many medical professionals from Singapore, the team strives to continue restore basic human functions to children in Laos which every child should enjoy." }), _jsx("p", { className: "text-gray-700 mb-4", children: "In partnership with Lao Friends Hospital for Children, the surgical team has fostered many connections and works together to provide free reconstructive surgeries that help children eat, speak, and smile without fear. Our team performs a wide range of procedures including cleft lip repair, cleft palate repair, burns contracture scar release and congenital hand surgery." }), _jsx("p", { className: "text-gray-700 mb-4", children: "  " }), _jsx("p", { className: "text-gray-700 mb-4", children: "Beyond surgery, the team is deeply committed to making a lasting impact by training local doctors, equipping them with the skills and knowledge to continue treating cleft conditions. This ensures that future generations of children will receive the care they need long after the mission ends." })] })] }), _jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Our Team" }), Object.keys(teamMembers).map((category) => (_jsxs("div", { className: "mb-8", children: [_jsx("h3", { className: "text-2xl font-semibold mb-4 capitalize", children: category.replace(/([A-Z])/g, ' $1') }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8", children: teamMembers[category].map((member, index) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "aspect-square relative mb-4", children: _jsx("img", { src: member.image, alt: member.name, className: "rounded-lg object-cover w-full h-full", onError: (e) => {
                                                        e.currentTarget.src = 'fallback-image-url'; // Optional: Add a fallback image URL
                                                        e.currentTarget.alt = 'Fallback Image';
                                                    } }) }), _jsx("h3", { className: "font-semibold text-lg", children: member.name }), member.role && (_jsx("p", { className: "text-gray-600", children: member.role }))] }, index))) })] }, category)))] }), _jsxs("div", { className: "container mx-auto p-4 text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Our Team" }), _jsx("div", { className: "flex flex-col items-center space-y-8", children: Object.entries(teamppl).map(([role, members]) => (_jsxs("div", { className: "w-full max-w-md", children: [_jsx("h3", { className: "text-xl font-semibold text-blue-600 mb-3", children: role }), _jsx("ul", { className: "space-y-1", children: members.map((member, index) => (_jsx("li", { className: "text-gray-700", children: member }, index))) })] }, role))) })] })] }) }));
};
export default Resume;
