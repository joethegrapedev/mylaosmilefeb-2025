import Title from './Title';
import { FadeIn } from './FadeIn';

const JoinUs = () => {
  return (
    <section
      id="joinus"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center mb-10">
          <Title title="JOIN US" des="Medical Volunteering" />
        </div>

        <div className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Thousands of young children in Laos live with untreated correctable conditions such as cleft lips, palates and burn contractures, simply because of the lack of accessibility of adequate surgical care. Your skills can help rewrite a patient's future.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Our Reconstructive Surgery Mission Team welcomes skilled and compassionate medical volunteers to provide life-changing procedures for these children, as well as hands-on training for local healthcare professionals.
              </p>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">We're seeking:</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Surgeons</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Plastic & reconstructive surgeons</li>
                      <li>• Hand surgeons</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Anaesthesia</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Anaesthetists</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Nurses</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Operating Room Nurse</li>
                      <li>• Recovery Room/ Ward Nurse</li>
                      <li>• Pediatric trained Nurse</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://forms.gle/4HddM3irgzARN3DT6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-designColor hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Apply to Volunteer
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
