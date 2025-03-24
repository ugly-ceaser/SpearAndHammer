'use client';
import React from 'react';
import Hero from '@/components/career/hero';
import Join from '@/components/career/join'
import Vacancy from '@/components/career/vacancy';


export default function Career(){
    return(
        <main className="bg-white min-h-screen px-[7vw]">
            <Hero/>
            <Join/>
            <Vacancy/>



        </main>
    )
}