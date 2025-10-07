import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Data from '@/data/vacancies.json';
import Modal from '../ui/Modal';

interface VacancyData {
  title: string;
  location: string;
  experience: string;
  jobs: {
    title: string;
    location: string;
    experience: string;
    skills: string[];
    description: string;
  }[];
}

export default function Vacancy() {
  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);
  const [vacancyData, setVacancyData] = useState<VacancyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const toggleJobDetails = (index: number) => {
    setExpandedJobIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setMounted(true);
    const fetchData = () => {
      try {
        const data = Data;
        setVacancyData(data);
      } catch (error) {
        console.error('Error fetching vacancy data:', error);
      }
    };

    fetchData();
  }, []);

  // Don't render interactive content until mounted
  if (!mounted) {
    return (
      <div className="h-full w-full flex flex-col sm:flex-row items-start justify-between">
        <h1 className="text-4xl font-bold text-left mb-4 text-gray-800 w-full sm:w-[50%]">
          Vacancy
        </h1>
        <div className="w-full sm:w-[50%]">
          <div className="mt-5 text-gray-800">Loading vacancies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80vw] mx-auto px-4">
      <div className="h-full w-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
      <h1 className="text-4xl font-bold text-center sm:text-left mb-4 text-gray-800 w-full sm:w-[50%]">
        Vacancy
      </h1>

      <div className="w-full sm:w-[50%]">
        {vacancyData && vacancyData.jobs.length > 0 ? (
          vacancyData.jobs.map((job, index) => (
            <div key={index} className="border-b border-gray-300 mb-4 pb-4 w-full">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                <button
                  className="bg-black text-white p-2 inline-flex items-center justify-center rounded"
                  aria-label={`Toggle details for ${job.title}`}
                  onClick={() => toggleJobDetails(index)}
                  suppressHydrationWarning
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>

              {expandedJobIndex === index && (
                <div className="mt-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-gray-800 font-bold">Location</h3>
                      <h4 className="text-gray-800">{job.location}</h4>
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-bold">Experience</h3>
                      <h4 className="text-gray-800">{job.experience}</h4>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-gray-800 font-bold">Required Skills</h4>
                    <p className="text-gray-800">{job.skills.join(', ')}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-gray-800 font-bold">Description</h4>
                    <p className="text-gray-800">{job.description}</p>
                  </div>

                  <div className="w-full flex justify-end">
                    <button
                      className="w-[40%] sm:w-[5vw] h-[5vh] bg-[#000] text-[white] rounded"
                      onClick={() => handleApplyClick(job.title)}
                      suppressHydrationWarning
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="mt-5 text-gray-800">No jobs are available now.</div>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="min-[45vh]-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <div className="w-full max-w-4xl bg-white p-8 rounded-md shadow-lg">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-black">
                  Apply as a <span className="text-gray-800">{selectedJobTitle}</span>
                </h1>
              </div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-800 font-medium">
                    Full name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-800 font-medium">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="cvLink" className="block text-gray-800 font-medium">
                    Link to your CV<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cvLink"
                    name="cvLink"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    required
                    className="w-5 h-5 text-black border border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
                  />
                  <label htmlFor="privacyPolicy" className="ml-3 text-gray-700">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-black underline">
                      Privacy policy
                    </a>
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-40 h-12 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
      </div>
    </div>
  );
}
