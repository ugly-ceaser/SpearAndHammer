'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Handle quotation request logic here
            console.log('Quotation request:', formData);
            
            setSubmitStatus('success');
            setFormData({ name: "", email: "", projectType: "", message: "" });
            
            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Don't render the form until client-side hydration is complete
    if (!mounted) {
        return null;
    }

    return (
        <footer className="bg-white py-16">
            <div className="w-[80vw] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Request Quotation */}
                    <div className="flex flex-col justify-center items-center text-center px-6 py-8 border-r-0 lg:border-r border-gray-200">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">GET A QUOTE</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
                            Ready to start your project? Request a personalized quotation 
                            for your software development or training needs.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Free consultation included
                        </div>
                    </div>

                    {/* Quotation Request Form */}
                    <div className="flex flex-col justify-center items-center w-full px-6 py-8 border-r-0 lg:border-r border-gray-200">
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-gray-800 placeholder-gray-500 text-sm"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your email"
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-gray-800 placeholder-gray-500 text-sm"
                                    required
                                />
                            </div>
                            
                            <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-gray-800 text-sm"
                                required
                            >
                                <option value="">Select project type</option>
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App</option>
                                <option value="software-development">Custom Software</option>
                                <option value="it-training">IT Training</option>
                                <option value="consultation">Consultation</option>
                                <option value="other">Other</option>
                            </select>
                            
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Brief project description"
                                rows={3}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-gray-800 placeholder-gray-500 text-sm resize-none"
                                required
                            />
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    submitStatus === 'success' ? (
                                        <>
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Request Sent!
                                        </>
                                    ) : submitStatus === 'error' ? (
                                        <>
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Try Again
                                        </>
                                    ) : (
                                        'Request Quote'
                                    )
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col items-center justify-center px-6 py-8">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">FOLLOW US</h3>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-200 group">
                                <Image src="icons/x.svg" alt="Twitter(X)" width={20} height={20} className="group-hover:invert" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-200 group">
                                <Image src="/icons/fb.svg" alt="Facebook" width={20} height={20} className="group-hover:invert" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-200 group">
                                <Image src="icons/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="group-hover:invert" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-200 group">
                                <Image src="icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="group-hover:invert" />
                            </a>
                        </div>
                        <p className="text-sm text-gray-500 text-center max-w-sm">
                            Join our community for daily tech updates
                        </p>
                    </div>
                </div>

                 {/* Logo, Contact, and Navigation Section */}
                 <div className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
                    {/* Logo and Company Info */}
                    <div className="flex flex-col items-center px-6 py-8 border-r-0 md:border-r border-gray-200">
                        <Link href="/" className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Spear & Hammer</h2>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
                            Forging excellence in software development and IT training. 
                            We transform ideas into digital solutions and raw talent into refined expertise.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Lagos, Nigeria
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col items-center text-center px-6 py-8 border-r-0 md:border-r border-gray-200">
                        <h3 className="text-lg font-bold mb-6 text-gray-800">PHONE AND EMAIL</h3>
                        <a href="mailto:spearhammer@gmail.com" className="text-gray-600 hover:text-gray-800 mb-4">
                            spearhammer@gmail.com
                        </a>
                        <a href="tel:+2344566543739" className="text-gray-600 hover:text-gray-800">
                            +234 4566 543 739
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center text-center px-6 py-8">
                        <h3 className="text-lg font-bold mb-6 text-gray-800">PAGES</h3>
                        <div className="flex flex-col items-center gap-3">
                            <Link href="/about" className="text-gray-600 hover:text-gray-800">
                                About Us
                            </Link>
                            <Link href="/training" className="text-gray-600 hover:text-gray-800">
                                Trainings
                            </Link>
                            <Link href="/projects" className="text-gray-600 hover:text-gray-800">
                                Projects
                            </Link>
                            <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                                Contact Us
                            </Link>
                            <Link href="/privacy" className="text-gray-600 hover:text-gray-800">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Section */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
                        <div className="px-4 py-6 border-r-0 md:border-r border-gray-200 last:border-r-0">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">150+</h4>
                            <p className="text-sm text-gray-600">Projects Completed</p>
                        </div>
                        <div className="px-4 py-6 border-r-0 md:border-r border-gray-200 last:border-r-0">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">500+</h4>
                            <p className="text-sm text-gray-600">Students Trained</p>
                        </div>
                        <div className="px-4 py-6 border-r-0 md:border-r border-gray-200 last:border-r-0">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">98%</h4>
                            <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div className="px-4 py-6 last:border-r-0">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">5+</h4>
                            <p className="text-sm text-gray-600">Years Experience</p>
                        </div>
                    </div>
                </div>

                {/* Copyright Notice */}
                <div className="mt-16 pt-12 border-t border-gray-200 flex flex-col items-center gap-6 px-6 py-8">
                    <p className="text-gray-600 text-sm text-center">
                        © 2024 Spear & Hammer. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                        <Link href="/privacy" className="hover:text-gray-800 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-gray-800 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-gray-800 transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
