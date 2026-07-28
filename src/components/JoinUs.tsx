import { useState, useEffect } from 'react';
import Title from './Title';
import { FadeIn } from './FadeIn';
import { getPublished } from '../firebase/content';
import { joinUsDefault } from '../content/defaults/joinus';

const JoinUs = () => {
  const [content, setContent] = useState(joinUsDefault);

  useEffect(() => {
    getPublished('joinus', joinUsDefault).then(setContent);
  }, []);

  return (
    <section
      id="joinus"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center mb-10">
          <Title title={content.title} des={content.des} />
        </div>

        <div className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 text-lg leading-relaxed mb-6 last:mb-8"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {content.seekingHeading}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.cards.map((card) => (
                    <div
                      key={card.id}
                      className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">
                        {card.heading}
                      </h4>
                      <ul className="text-gray-600 space-y-2">
                        {card.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <a
                  href={content.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-designColor hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {content.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default JoinUs;
