'use client';

import { FaGlobe } from 'react-icons/fa6';

export default function AboutPage() {
  return (
    <div className="w-[80vw] mx-auto px-4 py-8 md:py-12 mt-[15vh]">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Section */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800 text-center md:text-left">
            WHO WE ARE?
          </h2>
          <div className="space-y-4 text-gray-600">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Grid Item 1 */}
            <div className="flex flex-col items-center text-center p-4 bg-white 
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-3">
                <FaGlobe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">INNOVATION</h3>
              <p className="text-gray-600 text-justify">
                Pushing boundaries with cutting-edge solutions and creative approaches to technical challenges.
              </p>
            </div>

            {/* Grid Item 2 */}
            <div className="flex flex-col items-center text-center p-4 bg-white 
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-3">
                <FaGlobe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">EXPERTISE</h3>
              <p className="text-gray-600 text-justify">
                Deep technical knowledge combined with years of industry experience.
              </p>
            </div>

            {/* Grid Item 3 */}
            <div className="flex flex-col items-center text-center p-4 bg-white  
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-3">
                <FaGlobe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">QUALITY</h3>
              <p className="text-gray-600 text-justify">
                Unwavering commitment to delivering excellence in every project we undertake.
              </p>
            </div>

            {/* Grid Item 4 */}
            <div className="flex flex-col items-center text-center p-4 bg-white 
                transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-3">
                <FaGlobe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">PARTNERSHIP</h3>
              <p className="text-gray-600 text-justify">
                Building lasting relationships through collaboration and mutual success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
