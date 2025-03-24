"use client";

import Image from "next/image";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function LogoBanner() {
    return (
        <ParallaxProvider>
        <div className="w-full py-8 md:py-16 lg:py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 lg:gap-6 items-center justify-items-center">
                    {/* Left sliding logos */}
                    {[...Array(3)].map((_, index) => (
                        <Parallax 
                            key={`left-${index}`}
                            translateX={['-50%', '0%']}
                            startScroll={0}
                            endScroll={200}
                            className={`${index > 0 ? 'hidden md:block' : ''} w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 relative transition-transform duration-300 hover:scale-110`}
                        >
                            <Image
                                src="/icons/logo.png"
                                alt={`Logo ${index + 1}`}
                                fill
                                className="object-contain"
                            />
                        </Parallax>
                    ))}

                    {/* Center logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 relative transition-transform duration-300 hover:scale-110">
                        <Image
                            src="/icons/logo.png"
                            alt="Center Logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Right sliding logos */}
                    {[...Array(3)].map((_, index) => (
                        <Parallax
                            key={`right-${index}`}
                            translateX={['50%', '0%']}
                            startScroll={0}
                            endScroll={200}
                            className={`${index > 0 ? 'hidden md:block' : ''} w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 relative transition-transform duration-300 hover:scale-110`}
                        >
                            <Image
                                src="/icons/logo.png"
                                alt={`Logo ${index + 4}`}
                                fill
                                className="object-contain"
                            />
                        </Parallax>
                    ))}
                </div>
            </div>
        </div>
        </ParallaxProvider>
    );
}




