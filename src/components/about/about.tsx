'use client';

import { FaGlobe } from 'react-icons/fa6';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 mt-[25vh]">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Section */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            WHO WE ARE?
          </h2>
          <div className="space-y-6 text-gray-600">
            <p className="text-justify">
              At Spear & Hammer, we are dedicated to pushing the boundaries of technological innovation 
              while maintaining a steadfast commitment to quality and excellence. Our team of skilled 
              professionals brings together years of industry experience and cutting-edge expertise to 
              deliver solutions that make a real difference.
            </p>
            <p className="text-justify">
              We believe in fostering long-term partnerships with our clients, understanding their unique 
              challenges, and crafting tailored solutions that drive success. Our approach combines 
              technical prowess with creative thinking, ensuring that every project we undertake meets 
              and exceeds expectations.
            </p>
          </div>
        </div>

        {/* Right Section - Grid */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grid Item 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white 
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">INNOVATION</h3>
              <p className="text-gray-600">
                Pushing boundaries with cutting-edge solutions and creative approaches to technical challenges.
              </p>
            </div>

            {/* Grid Item 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white 
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">EXPERTISE</h3>
              <p className="text-gray-600">
                Deep technical knowledge combined with years of industry experience.
              </p>
            </div>

            {/* Grid Item 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white  
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">QUALITY</h3>
              <p className="text-gray-600">
                Unwavering commitment to delivering excellence in every project we undertake.
              </p>
            </div>

            {/* Grid Item 4 */}
            <div className="flex flex-col items-center text-center p-6 bg-white 
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">PARTNERSHIP</h3>
              <p className="text-gray-600">
                Building lasting relationships through collaboration and mutual success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
