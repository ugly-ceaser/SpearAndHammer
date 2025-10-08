import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Data from '@/data/vacancies.json';
import Modal from '../ui/Modal';
import { sendFormSubmission } from '@/lib/emailService';
import { useToast } from '@/components/ui/Toast';

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
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cvLink: '',
    privacyPolicy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { showToast } = useToast();

  const toggleJobDetails = (index: number) => {
    setExpandedJobIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
    setSubmitStatus('idle');
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.cvLink.trim()) newErrors.cvLink = 'CV link is required';
    if (!formData.privacyPolicy) newErrors.privacyPolicy = 'You must accept the privacy policy';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const submissionData = {
        ...formData,
        jobTitle: selectedJobTitle
      };
      
      const result = await sendFormSubmission('jobApplication', submissionData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          cvLink: '',
          privacyPolicy: false
        });
        setErrors({});
        showToast({
          type: 'success',
          title: 'Application Submitted!',
          message: 'We will review your application and get back to you soon.'
        });
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Job application submission error:', error);
      setSubmitStatus('error');
      showToast({
        type: 'error',
        title: 'Submission Failed',
        message: 'Please try again or email us directly at info@spearandhammertech.com'
      });
    } finally {
      setIsSubmitting(false);
    }
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

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Apply as a ${selectedJobTitle}`}
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-800 font-medium mb-2">
              Full name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="cvLink" className="block text-gray-800 font-medium mb-2">
              Link to your CV<span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="cvLink"
              name="cvLink"
              value={formData.cvLink}
              onChange={handleInputChange}
              placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
            />
            {errors.cvLink && <p className="text-red-500 text-sm mt-1">{errors.cvLink}</p>}
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacyPolicy"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={handleInputChange}
              required
              className="w-5 h-5 text-black border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 mt-1"
            />
            <label htmlFor="privacyPolicy" className="ml-3 text-gray-700">
              By submitting this form, you agree to our{" "}
              <a href="/privacy" className="text-black underline hover:text-gray-800">
                Privacy policy
              </a>
            </label>
            {errors.privacyPolicy && <p className="text-red-500 text-sm mt-1">{errors.privacyPolicy}</p>}
          </div>
          
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium">✅ Application submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">We&apos;ll review your application and get back to you soon.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-800 font-medium">❌ Submission failed</p>
              <p className="text-red-600 text-sm mt-1">Please try again or email us directly at info@spearandhammertech.com</p>
            </div>
          )}
          
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-40 h-12 bg-black text-white rounded-full font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              {isSubmitting ? 'Submitting...' : submitStatus === 'success' ? 'Submitted!' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>
      </div>
    </div>
  );
}
