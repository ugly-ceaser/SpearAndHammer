'use client'
import React, { useState } from "react";
import { sendFormSubmission } from '@/lib/emailService';

// Add this type at the top of your component
type FormErrors = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    message: "",
    privacyPolicy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: e.target.type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Invalid Email Format";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const result = await sendFormSubmission('contact', formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          companyName: "",
          message: "",
          privacyPolicy: false,
        });
        setErrors({});
      } else {
        throw new Error(result.error || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="w-full py-8 bg-white">
      <div className="w-[80vw] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
                    <div className="flex flex-col justify-center text-center lg:text-left px-4 lg:px-8">
            <div className="mb-6">
              <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Let&apos;s Build Something Amazing Together
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Send Us A Message
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              Have a project in mind or need expert advice? We&apos;d love to hear from you. 
              Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">Email Us</h4>
                  <a href="mailto:info@spearandhammer.com.ng" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    info@spearandhammer.com.ng
                  </a>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">Call Us</h4>
                  <a href="tel:+2344566543739" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    +234 4566 543 739
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">Visit Us</h4>
                  <p className="text-gray-600">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-2">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-gray-800">Quick Response Guaranteed</span>
              </div>
              <p className="text-sm text-gray-600">We typically respond to all inquiries within 2-4 hours during business hours.</p>
            </div>
          </div>

          {/* Right Section - Form */}
                    {/* Right Section - Form */}
          <div className="bg-gray-50 rounded-lg p-6 lg:p-8 shadow-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-800 font-medium mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-gray-800 transition-colors duration-300"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-800 font-medium mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+234 xxx xxx xxxx"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-800 transition-colors duration-300"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              {/* Email and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-800 font-medium mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@company.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-gray-800 transition-colors duration-300"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-gray-800 font-medium mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Your company name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-gray-800 transition-colors duration-300"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-800 font-medium mb-1"
                >
                  How can we help you? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-gray-800 transition-colors duration-300 resize-none"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  className="w-5 h-5 text-black border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 mt-1"
                />
                <label
                  htmlFor="privacyPolicy"
                  className="text-gray-700 text-sm leading-relaxed"
                >
                  By submitting this form, you agree to our{" "}
                  <a
                    href="#"
                    className="text-black underline hover:text-gray-700 transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>{" "}
                  and consent to being contacted about your inquiry.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Try Again
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm mt-2 text-center">Thank you! We&apos;ll get back to you within 24 hours.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm mt-2 text-center">Failed to send message. Please try again or email us directly.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Additional Contact Information Section */}
      <div className="bg-gray-50 py-12 mt-12">
        <div className="w-[80vw] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Why Choose Spear & Hammer?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to delivering exceptional results and building lasting partnerships with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-gray-600 text-sm">Experienced professionals with proven track records in software development and IT training.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick turnaround times without compromising on quality. We respect your deadlines.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Custom Solutions</h3>
              <p className="text-gray-600 text-sm">Tailored approaches that fit your specific business needs and requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12">
        <div className="w-[80vw] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <h4 className="font-semibold text-gray-800 mb-2">How quickly can you start my project?</h4>
              <p className="text-gray-600 text-sm">We can typically begin new projects within 1-2 weeks, depending on complexity and our current workload.</p>
            </div>

            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <h4 className="font-semibold text-gray-800 mb-2">Do you offer ongoing support?</h4>
              <p className="text-gray-600 text-sm">Yes, we provide comprehensive post-launch support and maintenance services for all our projects.</p>
            </div>

            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <h4 className="font-semibold text-gray-800 mb-2">What technologies do you work with?</h4>
              <p className="text-gray-600 text-sm">We specialize in modern web technologies, mobile development, cloud solutions, and enterprise software.</p>
            </div>

            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <h4 className="font-semibold text-gray-800 mb-2">Can you handle large enterprise projects?</h4>
              <p className="text-gray-600 text-sm">Absolutely! We have experience with enterprise-level projects and can scale our team as needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
