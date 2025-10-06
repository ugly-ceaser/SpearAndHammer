'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function About() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full min-h-[50vh] flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left justify-center p-3 md:p-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-black text-center md:text-left">
                    Empowering Through Technology
                </h3>
                <div className="relative w-full max-w-[500px] aspect-square mb-4 md:mb-8 bg-gray-200">
                    {mounted && (
                        <Image
                            src="/bg/bg4.jpg"
                            alt="About Spear & Hammer"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            priority
                            className="object-cover rounded-lg"
                        />
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-3 md:p-6">
                <div className={`${mounted ? 'opacity-100' : 'opacity-0'} w-full max-w-xl`}>
                    <p className="text-gray-600 text-justify mb-8 leading-relaxed text-sm md:text-base">
                        At Spear & Hammer, we forge excellence in software development and IT training.
                        Our team of seasoned professionals brings decades of industry experience to
                        deliver cutting-edge solutions and comprehensive training programs. We believe
                        in transforming raw talent into refined expertise, just as a blacksmith shapes
                        metal into masterpieces. Our commitment to quality and innovation has made us
                        a trusted partner for businesses and aspiring professionals alike. Through our
                        hands-on approach and industry-focused curriculum, we ensure success in the
                        ever-evolving tech landscape.
                    </p>
                    
                    <div className="flex flex-col space-y-8">
                        <div className="text-center md:text-left md:self-start">
                            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-gray-600">150+</h1>
                            <p className="text-lg md:text-xl text-gray-600">Projects Completed</p>
                        </div>
                        <div className="flex flex-row justify-center md:justify-start space-x-8 md:space-x-16">
                            <div className="text-center">
                                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-600">500+</h1>
                                <p className="text-lg md:text-xl text-gray-600">Students Trained</p>
                            </div>
                            <div className="text-center">
                                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-600">98%</h1>
                                <p className="text-lg md:text-xl text-gray-600">Delivery Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



