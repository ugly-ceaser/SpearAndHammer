'use client';

import { useState } from 'react';
import { useToast } from '../ui/Toast';
import Modal from '../ui/Modal';
import { sendFormSubmission } from '@/lib/emailService';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    projectDescription: string;
    budget: string;
    timeline: string;
}

export default function ServicesCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        projectDescription: '',
        budget: '',
        timeline: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (!formData.name || !formData.email || !formData.service) {
                showToast({
                    type: 'error',
                    title: 'Validation Error',
                    message: 'Please fill in all required fields.'
                });
                setIsSubmitting(false);
                return;
            }

            // Send email using EmailJS
            await sendFormSubmission('Service Inquiry', formData);

            showToast({
                type: 'success',
                title: 'Inquiry Submitted',
                message: 'Your service inquiry has been submitted successfully! We&apos;ll get back to you within 24 hours.'
            });

            // Reset form and close modal
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: '',
                projectDescription: '',
                budget: '',
                timeline: ''
            });
            setIsModalOpen(false);

        } catch (error) {
            console.error('Submission error:', error);
            showToast({
                type: 'error',
                title: 'Submission Failed',
                message: 'There was an error submitting your inquiry. Please try again or contact us directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="w-full py-16 md:py-24 bg-gradient-to-r from-gray-900 via-black to-gray-800">
                <div className="w-[90vw] max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Let&apos;s discuss your project requirements and how our services can help you achieve your goals. 
                        Get a free consultation and detailed project estimate.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <div className="text-3xl mb-3">🚀</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Fast Turnaround</h3>
                            <p className="text-gray-200 text-sm">Quick project kickoff within 48 hours of agreement</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <div className="text-3xl mb-3">💎</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
                            <p className="text-gray-200 text-sm">Industry best practices and cutting-edge technologies</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <div className="text-3xl mb-3">🤝</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Dedicated Support</h3>
                            <p className="text-gray-200 text-sm">24/7 support and regular project updates</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Free Consultation
                        </button>
                        <button
                            onClick={() => showToast({
                                type: 'info',
                                title: 'Contact Information',
                                message: 'Email: info@spearandhammertech.com | Phone: +1 (555) 123-4567'
                            })}
                            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                        >
                            Contact Us Directly
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="3xl">
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Service Inquiry</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1">
                                Service Interested In *
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-gray-900"
                            >
                                <option value="">Select a service</option>
                                <option value="consultation">Consultation</option>
                                <option value="project-management">Project Management</option>
                                <option value="development">Development</option>
                                <option value="system-design">System Design</option>
                                <option value="project-costing">Project Costing</option>
                                <option value="recruitment">Recruitment</option>
                                <option value="multiple">Multiple Services</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Project Budget
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
                            <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-700 mb-1">
                                Project Description
                            </label>
                            <textarea
                                id="projectDescription"
                                name="projectDescription"
                                value={formData.projectDescription}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Tell us about your project requirements, goals, and any specific features you need..."
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
                                    'Submit Inquiry'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 sm:flex-none border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}