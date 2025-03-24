"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-[9999] h-[15vh] transition-all duration-300">
      <div className="h-full px-3 sm:px-4 lg:px-5 mx-auto">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              {/* Desktop/Tablet Logo */}
              <div className="hidden sm:block">
                <Image
                  src="/logo.png"
                  alt="Spear and Hammer Logo"
                  width={300}
                  height={180}
                  className="w-[150px] md:w-[180px] lg:w-[300px] h-auto"
                  priority
                />
              </div>
              {/* Mobile Text - only show on mobile */}
              <div className="sm:hidden">
                <h1 className="text-3xl font-bold text-gray-800">
                  Spear&Hammer
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - only show on large screens */}
          <div className="hidden lg:flex items-center justify-end space-x-8 mr-[20px] text-lg w-auto">
            {/* Regular nav links wrapper */}
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 w-[40vw] md:w-[30vw]">

            <Link href="/" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                About Us
              </Link>
              <Link href="/projects" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Projects
              </Link>
              
              {/* Training Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                  suppressHydrationWarning
                  className="text-gray-800 hover:text-gray-600 flex items-center text-lg whitespace-nowrap transition-colors duration-300"
                >
                  Training Services
                  <svg 
                    className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${isTrainingOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isTrainingOpen && (
                  <div 
                    className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-500 ease-in-out origin-top"
                    style={{
                      opacity: isTrainingOpen ? 1 : 0,
                      transform: isTrainingOpen ? 'scaleY(1)' : 'scaleY(0)',
                    }}
                  >
                    <div className="py-1">
                      <Link 
                        href="/training/private"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                      >
                        Private Classes
                      </Link>
                      <Link 
                        href="/training/corporate"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                      >
                        Corporate Trainings
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/career" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Career
              </Link>
            </div>

            {/* Contact button - adjusted padding */}
            <Link 
              href="/contact"
              className="ml-4 sm:ml-6 md:ml-8 px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Tablet Navigation - only show on medium screens */}
          
          <div className="hidden sm:flex lg:hidden items-center justify-end space-x-2 md:space-x-3 mr-2 text-sm md:text-base w-auto">
            <div className="flex items-center space-x-2 md:space-x-3">

            <Link href="/" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                About Us
              </Link>
              <Link href="/projects" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Projects
              </Link>
              
              {/* Training Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                  suppressHydrationWarning
                  className="text-gray-800 hover:text-gray-600 flex items-center whitespace-nowrap transition-colors duration-300"
                >
                  Training
                  <svg 
                    className={`ml-1 h-3 w-3 transform transition-transform duration-300 ${isTrainingOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isTrainingOpen && (
                  <div 
                    className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-500 ease-in-out origin-top"
                    style={{
                      opacity: isTrainingOpen ? 1 : 0,
                      transform: isTrainingOpen ? 'scaleY(1)' : 'scaleY(0)',
                    }}
                  >
                    <div className="py-1">
                      <Link 
                        href="/training/private"
                        className="block px-3 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Private Classes
                      </Link>
                      <Link 
                        href="/training/corporate"
                        className="block px-3 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Corporate
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/career" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Career
              </Link>
            </div>

            <Link 
              href="/contact"
              className="ml-2 md:ml-3 px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button - only show on mobile */}
          <div className="sm:hidden mr-[20px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              suppressHydrationWarning
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - only show on mobile */}
      {isOpen && (
        <div className="sm:hidden bg-white z-50 transition-all duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-lg">

          <Link
              href="/"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
            >
              About Us
            </Link>
            <Link
              href="/projects"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
            >
              Projects
            </Link>
            
            {/* Mobile Training Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                suppressHydrationWarning
                className="w-full text-left px-3 py-2 text-gray-800 hover:text-gray-600 flex items-center justify-between"
              >
                Training Services
                <svg 
                  className={`h-4 w-4 transform transition-transform duration-300 ${isTrainingOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isTrainingOpen && (
                <div 
                  className="pl-6 transform transition-all duration-500 ease-in-out origin-top"
                  style={{
                    opacity: isTrainingOpen ? 1 : 0,
                    transform: isTrainingOpen ? 'scaleY(1)' : 'scaleY(0)',
                  }}
                >
                  <Link
                    href="/training/private"
                    className="block px-3 py-2 text-gray-800 hover:text-gray-600"
                  >
                    Private Classes
                  </Link>
                  <Link
                    href="/training/corporate"
                    className="block px-3 py-2 text-gray-800 hover:text-gray-600"
                  >
                    Corporate Trainings
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/career"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600"
            >
              Career
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 mt-4 text-center rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


