"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-[9999] h-[12vh] sm:h-[14vh] lg:h-[15vh] transition-all duration-300 shadow-sm">
      <div className="h-full px-2 sm:px-4 lg:px-6 xl:px-8 w-[80vw] mx-auto">
        <div className="flex items-center justify-between h-full">
          {/* Company Name */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="block">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 whitespace-nowrap">
                Spear & Hammer
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - show on xl screens */}
          <div className="hidden xl:flex items-center justify-end space-x-6 text-base w-auto">
            {/* Regular nav links wrapper */}
            <div className="flex items-center space-x-6">
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
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Private Classes
                      </Link>
                      <Link 
                        href="/training/corporate"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
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

            {/* Contact button */}
            <Link 
              href="/contact"
              className="ml-6 px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>

          {/* Large Tablet Navigation - show on lg screens */}
          <div className="hidden lg:flex xl:hidden items-center justify-end space-x-4 text-sm w-auto">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-gray-600 whitespace-nowrap transition-colors duration-300">
                About
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
                    className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-500 ease-in-out origin-top"
                    style={{
                      opacity: isTrainingOpen ? 1 : 0,
                      transform: isTrainingOpen ? 'scaleY(1)' : 'scaleY(0)',
                    }}
                  >
                    <div className="py-1">
                      <Link 
                        href="/training/private"
                        className="block px-3 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                      >
                        Private Classes
                      </Link>
                      <Link 
                        href="/training/corporate"
                        className="block px-3 py-2 text-gray-800 hover:bg-gray-100 text-sm"
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
              className="ml-4 px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 text-sm whitespace-nowrap"
            >
              Contact
            </Link>
          </div>

          {/* Medium Tablet Navigation - show on md screens */}
          <div className="hidden md:flex lg:hidden items-center justify-end space-x-2 text-xs w-auto">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
                About
              </Link>
              <Link href="/projects" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
                Projects
              </Link>
              <Link href="/career" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
                Career
              </Link>
            </div>

            <Link 
              href="/contact"
              className="ml-2 px-2 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 text-xs"
            >
              Contact
            </Link>
          </div>

          {/* Small Tablet Navigation - show on sm screens */}
          <div className="hidden sm:flex md:hidden items-center justify-end w-auto">
            <Link 
              href="/contact"
              className="px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button - show on mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              suppressHydrationWarning
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-5 w-5"
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
                  className="block h-5 w-5"
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

      {/* Mobile Navigation - show on mobile */}
      {isOpen && (
        <div className="sm:hidden bg-white z-50 transition-all duration-300 border-t border-gray-200">
          <div className="px-3 pt-3 pb-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/projects"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            
            {/* Mobile Training Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                suppressHydrationWarning
                className="w-full text-left px-3 py-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-between transition-colors duration-300"
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
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/training/private"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Private Classes
                  </Link>
                  <Link
                    href="/training/corporate"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Corporate Trainings
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/career"
              className="block px-3 py-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Career
            </Link>
            
            <div className="pt-3">
              <Link
                href="/contact"
                className="block px-4 py-2 text-center rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


