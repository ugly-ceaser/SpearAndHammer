'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/Toast';
import Modal from '../ui/Modal';
import { sendFormSubmission } from '@/lib/emailService';
import servicesData from '@/data/services.json';

// Type definition for service data
interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    pricing: string;
    duration: string;
}

// Import services data from JSON
const services: Service[] = servicesData;

// Consultation form interface
interface ConsultationFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    description: string;
}

export default function ServicesList() {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [showConsultationModal, setShowConsultationModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState<ConsultationFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });

    const handleGetQuote = (serviceName: string) => {
        // Pre-fill the project type based on the service selected
        const projectTypeMap: Record<string, string> = {
            'Consultation': 'consultation',
            'Project Management': 'project-management',
            'Development': 'development',
            'System Design': 'system-design',
            'Project Costing': 'consultation',
            'Recruitment': 'recruitment'
        };

        setFormData(prev => ({
            ...prev,
            projectType: projectTypeMap[serviceName] || ''
        }));

        setShowConsultationModal(true);
    };

    const handleLearnMore = (serviceId: number) => {
        setSelectedService(selectedService === serviceId ? null : serviceId);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConsultationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (!formData.name || !formData.email || !formData.projectType) {
                showToast({
                    type: 'error',
                    title: 'Validation Error',
                    message: 'Please fill in all required fields.'
                });
                setIsSubmitting(false);
                return;
            }

            // Send consultation request using existing email service
            await sendFormSubmission('Consultation Request', formData);

            showToast({
                type: 'success',
                title: 'Consultation Requested',
                message: 'Your consultation request has been submitted successfully! We&apos;ll contact you within 24 hours.'
            });

            // Reset form and close modal
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                projectType: '',
                budget: '',
                timeline: '',
                description: ''
            });
            setShowConsultationModal(false);

        } catch (error) {
            console.error('Submission error:', error);
            showToast({
                type: 'error',
                title: 'Submission Failed',
                message: 'There was an error submitting your request. Please try again or contact us directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full py-16 md:py-24 bg-gray-50">
            <div className="w-[90vw] max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                        What We <span className="bg-black text-white px-3 py-1 rounded">Offer</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        From initial consultation to final deployment, we provide end-to-end services 
                        that transform your ideas into powerful, scalable solutions.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`relative bg-white rounded-lg shadow-lg border-2 p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                                index === 1 ? 'border-black' : 'border-gray-200'
                            }`}
                        >
                            {/* Popular Badge for featured service (Development) */}
                            {index === 1 && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                                        ⭐ Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Service Header */}
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                                <div className="text-2xl font-bold text-gray-800 mb-2">{service.pricing}</div>
                                <div className="text-gray-600 text-sm">{service.duration}</div>
                            </div>

                            {/* Service Description */}
                            <div className="mb-6">
                                <p className="text-gray-600 text-sm leading-relaxed text-center">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="mb-8">
                                <button
                                    onClick={() => handleLearnMore(service.id)}
                                    className="w-full text-left flex justify-between items-center py-2 text-gray-700 hover:text-black transition-colors mb-3"
                                >
                                    <span className="font-semibold">Key Features</span>
                                    <span className={`transform transition-transform ${selectedService === service.id ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                
                                {selectedService === service.id && (
                                    <ul className="space-y-3 animate-fade-in">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <span className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0">✓</span>
                                                <span className="text-gray-600 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Get Quote Button */}
                            <button
                                onClick={() => handleGetQuote(service.title)}
                                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                                    index === 1
                                        ? 'bg-black text-white hover:bg-gray-800'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                            >
                                Get Quote
                            </button>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Need a Custom Solution?
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Every project is unique. We offer customized service packages tailored to your specific 
                            requirements and budget. Let&apos;s discuss how we can help you achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setShowConsultationModal(true)}
                                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Schedule Consultation
                            </button>
                            <button
                                onClick={() => router.push('/projects')}
                                className="border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300"
                            >
                                View Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Consultation Modal */}
            <Modal isOpen={showConsultationModal} onClose={() => setShowConsultationModal(false)} maxWidth="3xl">
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Schedule a Consultation</h3>
                    
                    <form onSubmit={handleConsultationSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900 placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@company.com"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900 placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900 placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="Your Company Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900 placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-1">
                                Project Type *
                            </label>
                            <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                            >
                                <option value="">Select project type</option>
                                <option value="consultation">Technical Consultation</option>
                                <option value="development">Software Development</option>
                                <option value="system-design">System Architecture Design</option>
                                <option value="project-management">Project Management</option>
                                <option value="recruitment">Technical Recruitment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Budget Range
                                </label>
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                                >
                                    <option value="">Select budget range</option>
                                    <option value="under-5k">Under $5,000</option>
                                    <option value="5k-15k">$5,000 - $15,000</option>
                                    <option value="15k-50k">$15,000 - $50,000</option>
                                    <option value="50k-100k">$50,000 - $100,000</option>
                                    <option value="over-100k">Over $100,000</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Preferred Timeline
                                </label>
                                <select
                                    id="timeline"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                                >
                                    <option value="">Select timeline</option>
                                    <option value="asap">ASAP (Rush)</option>
                                    <option value="1-month">Within 1 month</option>
                                    <option value="2-3-months">2-3 months</option>
                                    <option value="3-6-months">3-6 months</option>
                                    <option value="6-months-plus">6+ months</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                                Project Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Tell us about your project requirements, goals, and any specific challenges you're facing..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900 placeholder-gray-500 resize-vertical"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
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
                                    'Schedule Consultation'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowConsultationModal(false)}
                                className="flex-1 sm:flex-none border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}