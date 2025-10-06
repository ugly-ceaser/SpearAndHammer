'use client';
import { FaUsers, FaChartBar, FaShieldAlt, FaCog, FaRocket, FaAward } from 'react-icons/fa';

export default function Benefits() {
    return (
        <div className="w-full py-16 bg-white">
            <div className="w-[80vw] mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-left text-gray-800 mb-6">
                    Why Invest in Corporate Training?
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
                    Transform your workforce into a competitive advantage with our comprehensive corporate training programs. 
                    Invest in your team's growth and watch your business thrive with enhanced skills and productivity.
                </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Benefit 1 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaUsers className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Team Collaboration</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Enhance team dynamics and collaboration through shared learning experiences and unified skill development.
                    </p>
                </div>

                {/* Benefit 2 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaChartBar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Increased Productivity</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Boost organizational efficiency with skilled employees who can leverage modern technologies effectively.
                    </p>
                </div>

                {/* Benefit 3 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaShieldAlt className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Risk Mitigation</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Reduce operational risks with properly trained staff who understand security protocols and best practices.
                    </p>
                </div>

                {/* Benefit 4 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaCog className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Process Optimization</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Streamline workflows and optimize business processes through technology-driven solutions and automation.
                    </p>
                </div>

                {/* Benefit 5 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaRocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Innovation Culture</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Foster a culture of innovation where employees feel confident to implement new technologies and ideas.
                    </p>
                </div>

                {/* Benefit 6 */}
                <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg
                    transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <FaAward className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Competitive Advantage</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Stay ahead of competitors with a skilled workforce that adapts quickly to technological changes.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 bg-gray-50 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-2">500+</h4>
                        <p className="text-gray-600">Professionals Trained</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-2">50+</h4>
                        <p className="text-gray-600">Companies Served</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-2">95%</h4>
                        <p className="text-gray-600">Client Satisfaction</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-2">40%</h4>
                        <p className="text-gray-600">Avg. Productivity Increase</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}