'use client';
import { useState } from 'react';
import { FaCheck, FaBuilding, FaUsers, FaCrown } from 'react-icons/fa';

interface ConsultationFormData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    companySize: string;
    industry: string;
    trainingNeeds: string;
    budget: string;
    timeline: string;
    objectives: string;
    privacyPolicy: boolean;
}

interface FormErrors {
    [key: string]: string;
}

export default function Enterprise() {
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [showConsultationForm, setShowConsultationForm] = useState(false);
    const [formData, setFormData] = useState<ConsultationFormData>({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        companySize: '',
        industry: '',
        trainingNeeds: '',
        budget: '',
        timeline: '',
        objectives: '',
        privacyPolicy: false
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const enterprisePackages = [
        {
            id: 'starter',
            name: 'Startup Package',
            price: 'From ₦500,000',
            participants: '5-15 employees',
            popular: false,
            features: [
                'Skills assessment',
                'Customized curriculum',
                '2-3 training modules',
                'On-site or virtual delivery',
                'Basic post-training support',
                'Progress tracking',
                'Certificate of completion'
            ]
        },
        {
            id: 'growth',
            name: 'Growth Package',
            price: 'From ₦1,200,000',
            participants: '15-50 employees',
            popular: true,
            features: [
                'Everything in Startup',
                'Multiple department training',
                '5-7 training modules',
                'Blended learning approach',
                'Advanced analytics',
                'Quarterly check-ins',
                'Manager training included',
                'Custom learning portal'
            ]
        },
        {
            id: 'enterprise',
            name: 'Enterprise Package',
            price: 'Custom Quote',
            participants: '50+ employees',
            popular: false,
            features: [
                'Everything in Growth',
                'Organization-wide rollout',
                'Unlimited modules',
                'Dedicated account manager',
                'Executive coaching',
                'Custom integration',
                'Ongoing consultation',
                'Multi-year agreements'
            ]
        }
    ];

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
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.companySize) newErrors.companySize = 'Company size is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.trainingNeeds) newErrors.trainingNeeds = 'Training needs are required';
        if (!formData.timeline) newErrors.timeline = 'Timeline is required';
        if (!formData.objectives) newErrors.objectives = 'Objectives are required';
        if (!formData.privacyPolicy) newErrors.privacyPolicy = 'You must accept the privacy policy';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Consultation form data:', { ...formData, selectedPackage });
            
            setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                companySize: '',
                industry: '',
                trainingNeeds: '',
                budget: '',
                timeline: '',
                objectives: '',
                privacyPolicy: false
            });
            setShowConsultationForm(false);
            setSelectedPackage(null);
            alert('Consultation request submitted successfully! We will contact you within 24 hours.');
            
        } catch {
            alert('There was an error submitting your request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleScheduleConsultation = (packageId: string) => {
        setSelectedPackage(packageId);
        setShowConsultationForm(true);
    };

    return (
        <div className="w-full py-16 bg-white">
            <div className="w-[80vw] mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    Enterprise Solutions & Pricing
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    Scalable corporate training solutions designed to grow with your business. 
                    From startups to large enterprises, we have the right package for your organization.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {enterprisePackages.map((pkg) => (
                    <div key={pkg.id} className={`relative bg-white rounded-lg shadow-lg border-2 p-8 
                        transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                        pkg.popular ? 'border-black' : 'border-gray-200'
                    }`}>
                        {/* Popular Badge */}
                        {pkg.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                                    <FaCrown className="w-3 h-3 mr-2" />
                                    Most Popular
                                </span>
                            </div>
                        )}

                        {/* Package Icon */}
                        <div className="text-center mb-6">
                            {pkg.id === 'starter' && <FaBuilding className="w-12 h-12 mx-auto text-gray-600 mb-4" />}
                            {pkg.id === 'growth' && <FaUsers className="w-12 h-12 mx-auto text-gray-600 mb-4" />}
                            {pkg.id === 'enterprise' && <FaCrown className="w-12 h-12 mx-auto text-gray-600 mb-4" />}
                        </div>

                        {/* Package Header */}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{pkg.price}</div>
                            <div className="text-gray-600 text-sm">{pkg.participants}</div>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <FaCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Action Button */}
                        <button 
                            onClick={() => handleScheduleConsultation(pkg.id)}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                                pkg.popular 
                                    ? 'bg-black text-white hover:bg-gray-800' 
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            Schedule Consultation
                        </button>
                    </div>
                ))}
            </div>

            {/* Consultation Form Modal */}
            {showConsultationForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Schedule Corporate Training Consultation
                                </h3>
                                <button 
                                    onClick={() => setShowConsultationForm(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {selectedPackage && (
                                <p className="text-gray-600 mt-2">
                                    Selected: {enterprisePackages.find(p => p.id === selectedPackage)?.name}
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Company Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="companyName" className="block text-gray-800 font-medium mb-2">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    />
                                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                </div>
                                
                                <div>
                                    <label htmlFor="contactPerson" className="block text-gray-800 font-medium mb-2">
                                        Contact Person <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="contactPerson"
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    />
                                    {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                                        Business Email <span className="text-red-500">*</span>
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="companySize" className="block text-gray-800 font-medium mb-2">
                                        Company Size <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="companySize"
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    >
                                        <option value="">Select company size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                    {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
                                </div>

                                <div>
                                    <label htmlFor="industry" className="block text-gray-800 font-medium mb-2">
                                        Industry <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="industry"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    >
                                        <option value="">Select industry</option>
                                        <option value="technology">Technology</option>
                                        <option value="finance">Finance & Banking</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="retail">Retail & E-commerce</option>
                                        <option value="education">Education</option>
                                        <option value="government">Government</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="trainingNeeds" className="block text-gray-800 font-medium mb-2">
                                    Training Needs <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="trainingNeeds"
                                    name="trainingNeeds"
                                    value={formData.trainingNeeds}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800 resize-none"
                                    placeholder="Describe your team's current skill gaps and training requirements..."
                                    required
                                />
                                {errors.trainingNeeds && <p className="text-red-500 text-sm mt-1">{errors.trainingNeeds}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="budget" className="block text-gray-800 font-medium mb-2">
                                        Training Budget (Optional)
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="under-500k">Under ₦500,000</option>
                                        <option value="500k-1m">₦500,000 - ₦1,000,000</option>
                                        <option value="1m-2m">₦1,000,000 - ₦2,000,000</option>
                                        <option value="2m-5m">₦2,000,000 - ₦5,000,000</option>
                                        <option value="5m+">₦5,000,000+</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="timeline" className="block text-gray-800 font-medium mb-2">
                                        Preferred Timeline <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="timeline"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800"
                                        required
                                    >
                                        <option value="">Select timeline</option>
                                        <option value="immediate">Immediate (Within 2 weeks)</option>
                                        <option value="1-month">Within 1 month</option>
                                        <option value="2-3-months">2-3 months</option>
                                        <option value="6-months">Within 6 months</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                    {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="objectives" className="block text-gray-800 font-medium mb-2">
                                    Business Objectives <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="objectives"
                                    name="objectives"
                                    value={formData.objectives}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-800 resize-none"
                                    placeholder="What business outcomes do you hope to achieve through this training?"
                                    required
                                />
                                {errors.objectives && <p className="text-red-500 text-sm mt-1">{errors.objectives}</p>}
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
                                    <a href="#" className="text-black underline">
                                        Privacy Policy
                                    </a>{" "}
                                    and consent to being contacted about corporate training solutions.
                                </label>
                            </div>
                            {errors.privacyPolicy && <p className="text-red-500 text-sm mt-1">{errors.privacyPolicy}</p>}

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowConsultationForm(false)}
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
                                        'Schedule Consultation'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Contact Information */}
            <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Need a Custom Solution?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Every organization is unique. Contact our corporate training specialists to discuss 
                    a completely customized training program that meets your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                        href="mailto:corporate@spearhammer.com" 
                        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                        Email Corporate Team
                    </a>
                    <a 
                        href="tel:+2344566543739" 
                        className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                        Call +234 4566 543 739
                    </a>
                </div>
            </div>
            </div>
        </div>
    );
}