"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoadingLink } from "@/components/ui/LoadingLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isTrainingOpenMobile, setIsTrainingOpenMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setIsTrainingOpen(false);
    setIsTrainingOpenMobile(false);
    setIsOpen(false);
  }, [pathname]);

  // Handle outside clicks and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsTrainingOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTrainingOpen(false);
        setIsTrainingOpenMobile(false);
        setIsOpen(false);
      }
    };

    if (isTrainingOpen || isTrainingOpenMobile || isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTrainingOpen, isTrainingOpenMobile, isOpen]);

  // Hover handlers with delay (grace period)
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTrainingOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTrainingOpen(false);
    }, 200);
  };

  const handleClick = () => setIsTrainingOpen((prev) => !prev);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsTrainingOpen((prev) => !prev);
    }
    if (event.key === "Escape") setIsTrainingOpen(false);
    if (event.key === "ArrowDown" && isTrainingOpen) {
      event.preventDefault();
      const firstLink = dropdownRef.current?.querySelector("a");
      firstLink?.focus();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-[9999] h-[12vh] sm:h-[14vh] lg:h-[15vh] shadow-sm transition-all duration-300">
      <div className="h-full px-2 sm:px-4 lg:px-6 xl:px-8 w-[80vw] mx-auto">
        <div className="flex items-center justify-between h-full">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 min-w-0">
            <LoadingLink href="/" className="block">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 whitespace-nowrap">
                Spear & Hammer
              </h1>
            </LoadingLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center justify-end space-x-6 text-base w-auto">
            <LoadingLink href="/" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Home
            </LoadingLink>
            <LoadingLink href="/about" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              About Us
            </LoadingLink>
            <LoadingLink href="/projects" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Projects
            </LoadingLink>
            <LoadingLink href="/services" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Services
            </LoadingLink>

            {/* Dropdown Wrapper */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className="text-gray-800 hover:text-gray-600 flex items-center whitespace-nowrap transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-expanded={isTrainingOpen}
                aria-haspopup="menu"
                aria-controls="training-menu"
              >
                Training Services
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                    isTrainingOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                id="training-menu"
                role="menu"
                aria-hidden={!isTrainingOpen}
                className={`absolute z-20 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 origin-top transform transition-all duration-200 ease-out ${
                  isTrainingOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-2 invisible"
                }`}
              >
                <div className="py-1">
                  <Link
                    href="/training/private"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                    onClick={() => setIsTrainingOpen(false)}
                  >
                    Private Classes
                  </Link>
                  <Link
                    href="/training/corporate"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                    onClick={() => setIsTrainingOpen(false)}
                  >
                    Corporate Trainings
                  </Link>
                </div>
              </div>
            </div>

            <LoadingLink href="/career" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Career
            </LoadingLink>

            <LoadingLink
              href="/contact"
              className="ml-6 px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Contact Us
            </LoadingLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden bg-white z-50 transition-all duration-300 border-t border-gray-200">
          <div className="px-3 pt-3 pb-4 space-y-2">
            <LoadingLink
              href="/"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </LoadingLink>
            <LoadingLink
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </LoadingLink>
            <LoadingLink
              href="/projects"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </LoadingLink>
            <LoadingLink
              href="/services"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Services
            </LoadingLink>

            {/* Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTrainingOpenMobile(!isTrainingOpenMobile)}
                className="w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md flex items-center justify-between"
                aria-expanded={isTrainingOpenMobile}
              >
                Training Services
                <svg
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isTrainingOpenMobile ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className={`pl-6 mt-1 space-y-1 transition-all duration-200 ${
                  isTrainingOpenMobile
                    ? "opacity-100 max-h-32 visible"
                    : "opacity-0 max-h-0 invisible overflow-hidden"
                }`}
              >
                <LoadingLink
                  href="/training/private"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    setIsOpen(false);
                    setIsTrainingOpenMobile(false);
                  }}
                >
                  Private Classes
                </LoadingLink>
                <LoadingLink
                  href="/training/corporate"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    setIsOpen(false);
                    setIsTrainingOpenMobile(false);
                  }}
                >
                  Corporate Trainings
                </LoadingLink>
              </div>
            </div>

            <LoadingLink
              href="/career"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Career
            </LoadingLink>

            <div className="pt-3">
              <LoadingLink
                href="/contact"
                className="block px-4 py-2 text-center rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </LoadingLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
