'use client';
import { FaUserGraduate, FaClock, FaChartLine, FaHandshake, FaLaptopCode, FaCertificate } from 'react-icons/fa';

export default function Features() {
    return (
        <div className="w-full py-16 bg-white">
            <div className="w-[80vw] mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-left text-gray-800 mb-6">
                    Why Choose Private Classes?
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
                    Experience the power of personalized learning with our expert-led private IT training sessions. 
                    Get the individual attention you need to master complex technologies and accelerate your career growth.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaUserGraduate className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">1-on-1 Instruction</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Get personalized attention from expert instructors who adapt to your learning pace and style.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaClock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Flexible Scheduling</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Learn at your convenience with flexible scheduling that fits your busy lifestyle.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaChartLine className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Accelerated Learning</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Progress faster with customized curriculum tailored to your specific goals and skill level.
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaHandshake className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Mentor Support</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Receive ongoing mentorship and career guidance beyond the technical curriculum.
                    </p>
                </div>

                {/* Feature 5 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaLaptopCode className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Hands-on Projects</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Build real-world projects that you can add to your portfolio and showcase to employers.
                    </p>
                </div>

                {/* Feature 6 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaCertificate className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Certification Prep</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Prepare for industry certifications with targeted training and practice exams.
                    </p>
                </div>
            </div>
            </div>
        </div>
    );
}