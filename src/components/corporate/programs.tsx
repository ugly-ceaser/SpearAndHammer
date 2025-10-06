'use client';
import Image from 'next/image';

export default function Programs() {
    const trainingPrograms = [
        {
            id: 1,
            title: "Digital Transformation Workshop",
            duration: "3-5 days",
            participants: "5-20 employees",
            description: "Comprehensive program covering cloud migration, process automation, and digital strategy implementation for modern businesses.",
            modules: ["Cloud Strategy", "Process Automation", "Digital Tools", "Change Management"],
            image: "/bg/bg1.png",
            deliveryMode: "On-site & Virtual"
        },
        {
            id: 2,
            title: "Cybersecurity Awareness Training",
            duration: "2-3 days",
            participants: "10-50 employees",
            description: "Essential cybersecurity training to protect your organization from threats and ensure compliance with security standards.",
            modules: ["Threat Recognition", "Data Protection", "Incident Response", "Compliance"],
            image: "/bg/bg2.png",
            deliveryMode: "On-site & Virtual"
        },
        {
            id: 3,
            title: "Data Analytics for Business",
            duration: "4-6 days",
            participants: "8-25 employees",
            description: "Transform your team into data-driven decision makers with hands-on analytics training and business intelligence tools.",
            modules: ["Data Analysis", "Visualization", "Business Intelligence", "Predictive Analytics"],
            image: "/bg/bg1.png",
            deliveryMode: "On-site & Virtual"
        },
        {
            id: 4,
            title: "Agile & DevOps Implementation",
            duration: "5-7 days",
            participants: "10-30 employees",
            description: "Accelerate your development processes with Agile methodologies and DevOps practices for efficient software delivery.",
            modules: ["Agile Frameworks", "CI/CD Pipelines", "Automation Tools", "Team Collaboration"],
            image: "/bg/bg2.png",
            deliveryMode: "On-site & Virtual"
        },
        {
            id: 5,
            title: "Leadership in Technology",
            duration: "3-4 days",
            participants: "5-15 executives",
            description: "Executive-level training for technology leadership, strategic planning, and managing digital transformation initiatives.",
            modules: ["Tech Strategy", "Team Leadership", "Innovation Management", "Digital Vision"],
            image: "/bg/bg1.png",
            deliveryMode: "Executive Retreat"
        },
        {
            id: 6,
            title: "Custom Enterprise Solutions",
            duration: "Flexible",
            participants: "Variable",
            description: "Tailored training programs designed specifically for your organization's unique technology needs and business objectives.",
            modules: ["Custom Curriculum", "Specific Technologies", "Industry Focus", "Scalable Solutions"],
            image: "/bg/bg2.png",
            deliveryMode: "Customized"
        }
    ];

    return (
        <div className="w-full py-16 bg-gray-50">
            <div className="w-[80vw] mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-left text-gray-800 mb-6">
                    Corporate Training Programs
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
                    Choose from our proven corporate training programs or let us design a custom solution 
                    that addresses your organization's specific technology challenges and goals.
                </p>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainingPrograms.map((program) => (
                    <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden
                        transition-all duration-300 hover:shadow-xl hover:scale-105">
                        {/* Program Image */}
                        <div className="relative h-48 w-full">
                            <Image
                                src={program.image}
                                alt={program.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {program.deliveryMode}
                                </span>
                            </div>
                        </div>

                        {/* Program Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {program.title}
                            </h3>
                            
                            <div className="flex flex-col space-y-2 text-gray-600 text-sm mb-4">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    Duration: {program.duration}
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                    Participants: {program.participants}
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                {program.description}
                            </p>

                            {/* Modules */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-800 mb-2">Key Modules:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {program.modules.map((module, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {module}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 
                                transition-colors duration-300 font-medium">
                                Request Information
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Services Section */}
            <div className="mt-16">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Additional Corporate Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Skills Assessment</h4>
                            <p className="text-gray-600 text-sm">Evaluate your team's current skill levels and identify training needs</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Certification Programs</h4>
                            <p className="text-gray-600 text-sm">Industry-recognized certifications for your employees</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Ongoing Support</h4>
                            <p className="text-gray-600 text-sm">Post-training support and consultation services</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}