'use client';

import React from 'react';
import Image from "next/image";
// import { useEffect, useState } from "react";

// Separate TeamMember component for better reusability
const TeamMember = ({ name, image, role }: { name: string, image: string, role: string }) => (
    <div className="w-[300px] inline-flex flex-col items-center flex-shrink-0">
        <div className="relative w-full h-[40vh] mb-4 overflow-hidden ">
            <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 300px) 100vw, 300px"
                className="object-cover"
                loading="lazy"
            />
        </div>
        <h3 className="text-xl font-semibold text-gray-600">
            {name}
        </h3>
        <p className="text-sm text-gray-600">{role}</p>

    </div>
);

export default function Team() {
    // Base team members array without duplicates
    const teamMembers = [
        { name: "Odo Brenda", image: "/team/bg3.jpg", role: "CEO" },
        { name: "Jane Smith", image: "/team/bg3.jpg", role: "CTO" },
        { name: "Mike Johnson", image: "/team/bg3.jpg", role: "CFO" },
        { name: "Sarah Williams", image: "/team/bg3.jpg", role: "CMO" },
    ];

    return (
        <div className="w-full overflow-hidden">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-600">
                MEET OUR TEAM
            </h2>

            {/* Mobile view (CEO only) */}
            <div className="md:hidden flex justify-center">
                <TeamMember {...teamMembers[0]} />
            </div>

            {/* Desktop view (scrolling animation) */}
            <div className="hidden md:block relative w-full">
                <div className="flex animate-scroll whitespace-nowrap">
                    {[...Array(2)].map((_, setIndex) => (
                        teamMembers.map((member, index) => (
                            <TeamMember
                                key={`set-${setIndex}-${index}`}
                                {...member}
                            />
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
