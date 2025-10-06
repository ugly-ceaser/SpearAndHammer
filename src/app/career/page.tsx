'use client';
import React from 'react';
import Hero from '@/components/career/hero';
import Join from '@/components/career/join'
import Vacancy from '@/components/career/vacancy';


export default function Career(){
    return(
        <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6 lg:px-[7vw]">
            <Hero/>
            <div className="mt-16">
                <Join/>
            </div>
            <div className="mt-16">
                <Vacancy/>
            </div>
        </main>
    )
}