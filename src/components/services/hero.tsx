'use client';

import { useState, useEffect } from 'react';

export default function ServicesHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="relative w-full h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg/bg2.png')] bg-cover bg-center bg-no-repeat" />
                <div className="absolute inset-0" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-2 sm:px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Our Services</h1>
                    <p className="text-xl md:text-2xl text-center">Comprehensive solutions for your business needs</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
            {/* Background image and overlay */}
            <div className="absolute inset-0 bg-[url('/bg/bg2.png')] bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-300 ease-in-out hover:scale-110 hover:text-black hover:rounded-full">
                        Our <span className="bg-black text-white px-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:rounded-full">Services</span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-300 ease-in-out hover:scale-105 hover:text-black hover:rounded-3xl">
                        We deliver comprehensive software engineering solutions and expert consultation services that transform your business ideas into powerful, scalable digital solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-black shadow-lg hover:bg-white hover:scale-105 transition-all duration-300">
                            <span className="font-bold text-black">6+ Core Services</span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-black shadow-lg hover:bg-white hover:scale-105 transition-all duration-300">
                            <span className="font-bold text-black">Expert Consultation</span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-black shadow-lg hover:bg-white hover:scale-105 transition-all duration-300">
                            <span className="font-bold text-black">End-to-End Solutions</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}