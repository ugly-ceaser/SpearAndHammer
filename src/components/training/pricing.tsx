'use client';
import { useState } from 'react';
import { FaCheck, FaStar } from 'react-icons/fa';
import pricingData from '@/data/pricing.json';
import Modal from '../ui/Modal';
import { sendFormSubmission } from '@/lib/emailService';
import { useToast } from '@/components/ui/Toast';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    course: string;
    experience: string;
    goals: string;
    availability: string;
    privacyPolicy: boolean;
}

interface FormErrors {
    [key: string]: string;
}

interface PricingPlan {
    id: string;
    name: string;
    price: string;
    duration: string;
    sessions: string;
    popular: boolean;
    features: string[];
}

export default function Pricing() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        experience: '',
        goals: '',
        availability: '',
        privacyPolicy: false
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const pricingPlans: PricingPlan[] = pricingData;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        setFormData({
            ...formData,
            [name]: e.target.type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.course) newErrors.course = 'Please select a course';
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (!formData.goals) newErrors.goals = 'Learning goals are required';
        if (!formData.availability) newErrors.availability = 'Availability is required';
        if (!formData.privacyPolicy) newErrors.privacyPolicy = 'You must accept the privacy policy';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const submissionData = {
                ...formData,
                selectedPlan: pricingPlans.find(p => p.id === selectedPlan)?.name || selectedPlan
            };
            
            const result = await sendFormSubmission('trainingBooking', submissionData);
            
            if (result.success) {
                // Reset form and close modal
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    course: '',
                    experience: '',
                    goals: '',
                    availability: '',
                    privacyPolicy: false
                });
                setShowBookingForm(false);
                setSelectedPlan(null);
                showToast({
                    type: 'success',
                    title: 'Booking Request Submitted!',
                    message: 'We will contact you within 24 hours to schedule your training.'
                });
            } else {
                throw new Error(result.error || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Training booking submission error:', error);
            showToast({
                type: 'error',
                title: 'Submission Failed',
                message: 'Please try again or email us directly at info@spearandhammertech.com'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBookNow = (planId: string) => {
        setSelectedPlan(planId);
        setShowBookingForm(true);
    };

    return (
        <div className="w-full py-16 bg-white">
            <div className="w-[80vw] mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    Choose Your Learning Path
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    Select the package that best fits your learning goals and budget. 
                    All packages include personalized instruction and flexible scheduling.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {pricingPlans.map((plan) => (
                    <div key={plan.id} className={`relative bg-white rounded-lg shadow-lg border-2 p-8 
                        transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                        plan.popular ? 'border-black' : 'border-gray-200'
                    }`}>
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                                    <FaStar className="w-3 h-3 mr-2" />
                                    Most Popular
                                </span>
                            </div>
                        )}

                        {/* Plan Header */}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{plan.price}</div>
                            <div className="text-gray-600 text-sm">
                                {plan.duration} • {plan.sessions}
                            </div>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <FaCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Book Now Button */}
                        <button 
                            onClick={() => handleBookNow(plan.id)}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                                plan.popular 
                                    ? 'bg-black text-white hover:bg-gray-800' 
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Booking Form Modal */}
            <Modal
                isOpen={showBookingForm}
                onClose={() => setShowBookingForm(false)}
                title="Book Your Private Classes"
                subtitle={selectedPlan ? `Selected: ${pricingPlans.find(p => p.id === selectedPlan)?.name}` : undefined}
                maxWidth="2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-gray-800 font-medium mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                    required
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="course" className="block text-gray-800 font-medium mb-2">
                                        Preferred Course <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="course"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    >
                                        <option value="">Select a course</option>
                                        <option value="fullstack">Full-Stack Web Development</option>
                                        <option value="mobile">Mobile App Development</option>
                                        <option value="data-science">Data Science & Analytics</option>
                                        <option value="cloud">Cloud Computing & DevOps</option>
                                        <option value="cybersecurity">Cybersecurity Fundamentals</option>
                                        <option value="uiux">UI/UX Design & Prototyping</option>
                                        <option value="custom">Custom Course</option>
                                    </select>
                                    {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block text-gray-800 font-medium mb-2">
                                        Experience Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    >
                                        <option value="">Select level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="goals" className="block text-gray-800 font-medium mb-2">
                                    Learning Goals <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="goals"
                                    name="goals"
                                    value={formData.goals}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800 resize-none"
                                    placeholder="Tell us about your learning objectives and career goals..."
                                    required
                                />
                                {errors.goals && <p className="text-red-500 text-sm mt-1">{errors.goals}</p>}
                            </div>

                            <div>
                                <label htmlFor="availability" className="block text-gray-800 font-medium mb-2">
                                    Preferred Schedule <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="availability"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                    required
                                >
                                    <option value="">Select availability</option>
                                    <option value="weekday-morning">Weekday Mornings</option>
                                    <option value="weekday-afternoon">Weekday Afternoons</option>
                                    <option value="weekday-evening">Weekday Evenings</option>
                                    <option value="weekend">Weekends</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="privacyPolicy"
                                    name="privacyPolicy"
                                    checked={formData.privacyPolicy}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-black border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 mt-1"
                                    required
                                />
                                <label htmlFor="privacyPolicy" className="ml-3 text-gray-700">
                                    I agree to the{" "}
                                    <a href="/privacy" className="text-black underline hover:text-gray-800">
                                        Privacy Policy
                                    </a>{" "}
                                    and{" "}
                                    <a href="/terms" className="text-black underline hover:text-gray-800">
                                        Terms of Service
                                    </a>
                                </label>
                            </div>
                            {errors.privacyPolicy && <p className="text-red-500 text-sm mt-1">{errors.privacyPolicy}</p>}

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowBookingForm(false)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Booking Request'
                                    )}
                                </button>
                            </div>
                        </form>
                </Modal>

            {/* FAQ Section */}
            <div className="mt-16 bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Frequently Asked Questions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">How do I schedule my sessions?</h4>
                        <p className="text-gray-600 text-sm">
                            After booking, our team will contact you within 24 hours to arrange your flexible schedule based on your availability.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Can I change my course mid-program?</h4>
                        <p className="text-gray-600 text-sm">
                            Yes, we offer flexibility to adjust your curriculum based on your evolving interests and career goals.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">What if I need to reschedule a session?</h4>
                        <p className="text-gray-600 text-sm">
                            You can reschedule sessions with at least 24 hours notice. We understand life happens and work around your schedule.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Is there a refund policy?</h4>
                        <p className="text-gray-600 text-sm">
                            We offer a satisfaction guarantee. If you&apos;re not happy after the first session, we&apos;ll provide a full refund.
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}