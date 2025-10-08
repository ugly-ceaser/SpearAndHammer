'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Clients() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sample client data - replace with actual client logos and names
    const clients = [
        { name: "Client 1", logo: "/icons/logo.png" },
        { name: "Client 2", logo: "/icons/logo.png" },
        { name: "Client 3", logo: "/icons/logo.png" },
        { name: "Client 4", logo: "/icons/logo.png" },
        { name: "Client 5", logo: "/icons/logo.png" },
        { name: "Client 6", logo: "/icons/logo.png" }
    ];

    return (
        <div className="w-full py-8 md:py-16 bg-white mt-8 md:mt-16">
            <div className="w-[80vw] mx-auto px-4">
                {/* Title and Description Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4 md:gap-8">
                    <h2 className="text-3xl md:text-4xl text-center md:text-left font-bold text-gray-600 w-full md:w-1/3">
                        Our Top Clients
                    </h2>

                    <div className="w-full md:w-2/3 flex justify-center">
                        <p className="text-gray-600 leading-relaxed w-full md:w-[500px] text-center md:text-left">
                            We take pride in serving a diverse portfolio of clients across various industries. 
                            Our commitment to excellence has earned us the trust of leading organizations, 
                            from innovative startups to established enterprises. Through collaborative 
                            partnerships, we&apos;ve helped our clients achieve their goals and transform their 
                            business operations with cutting-edge solutions and dedicated support.
                        </p>
                    </div>
                </div>

                {/* Client Logo Section - Grid on desktop, Marquee on mobile */}
                <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8 md:mb-12">
                    {clients.map((client, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
                        >
                            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                                {mounted && (
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        priority={index < 3}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Marquee */}
                <div className="md:hidden overflow-hidden mb-8">
                    <div className="animate-marquee flex gap-4 whitespace-nowrap">
                        {/* First set of logos */}
                        {clients.map((client, index) => (
                            <div 
                                key={`first-${index}`} 
                                className="flex-shrink-0"
                            >
                                <div className="relative w-48 h-48">
                                    {mounted && (
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 100vw"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {clients.map((client, index) => (
                            <div 
                                key={`second-${index}`} 
                                className="flex-shrink-0"
                            >
                                <div className="relative w-48 h-48">
                                    {mounted && (
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 100vw"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
