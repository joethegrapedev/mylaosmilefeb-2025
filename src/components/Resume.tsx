import React, { useEffect, useState } from 'react';
import Title from './Title';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Achievement from './Achievement';
import { Tab } from '@headlessui/react';
import { FadeIn } from './FadeIn';
import { getPublished } from '../firebase/content';
import { storyDefault } from '../content/defaults/story';
import { youtubeEmbedUrl } from '../utils/youtube';

const Resume = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [story, setStory] = useState(storyDefault);

  useEffect(() => {
    getPublished('story', storyDefault).then(setStory);
  }, []);

  return (
    <section
      id="Resume"
      className="w-full py-20 border-b-[1px] border-b-gray-700">
        <FadeIn>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">{story.title}</h1>

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
              src={youtubeEmbedUrl(story.videoUrl)}
              title="MyLaoSmile Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
              className={`absolute inset-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            ></iframe>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">{story.historyHeading}</h2>
            {story.historyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>


        {/* Foreword Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">{story.foreword.heading}</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {story.foreword.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            <div className="text-right">
              {story.foreword.signature.map((line, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'font-semibold' : 'text-sm text-gray-600'}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {story.leaders.map((member, index) => (
              <div key={member.id ?? index} className="text-center">
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
      </div>
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-center mb-4">Our Contributors</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          This mission was made possible by the generosity and dedication of the
          medical volunteers below.
        </p>

        <div className="max-w-4xl mx-auto space-y-10">
          {story.roster.map(({ id, role, names }) => (
            <div key={id ?? role}>
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-800 whitespace-nowrap">
                  {role}
                </h3>
                <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
                <span className="text-sm text-gray-400" aria-hidden="true">
                  {names.length}
                </span>
              </div>
              <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
                {names.map((name) => (
                  <li
                    key={name}
                    className="text-gray-700 py-1 break-inside-avoid">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 italic max-w-2xl mx-auto mt-12">
          {story.acknowledgement.message}
        </p>
      </div>


      </FadeIn>
    </section>
  );
};

export default Resume;
