'use client';

import Image from "next/image";

export default function Testimonial() {
    const testimonials = [
        {
            name: "John Smith",
            title: "CEO, Tech Solutions Inc.",
            image: "/testimonials/person1.jpg",
            quote: "Working with Spear & Hammer has transformed our development process. Their expertise and dedication are unmatched."
        },
        {
            name: "Sarah Johnson",
            title: "CTO, Innovation Labs",
            image: "/testimonials/person1.jpg",
            quote: "The training programs provided by Spear & Hammer have significantly improved our team's technical capabilities."
        },
        {
            name: "Michael Chen",
            title: "Director, Digital Ventures",
            image: "/testimonials/person1.jpg",
            quote: "Their commitment to excellence and innovative solutions have made them our go-to technology partner."
        }
    ];

    return (
        <div className="w-full py-16 bg-white">
            {/* Header Section */}
            <h2 className="text-4xl font-bold text-left text-gray-800 mb-12">
                What Our Clients Say?
            </h2>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {testimonials.map((testimonial, index) => (
                    <div 
                        key={index}
                        className="flex flex-col items-start p-6   transition-transform duration-300 hover:scale-105"
                    >
                        {/* Image and Info Container */}
                        <div className="flex flex-row items-center gap-4 mb-4">
                            {/* Image */}
                            <div className="relative w-20 h-20">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={60}
                                    height={60}
                                    className="object-cover rounded-full"
                                />
                            </div>

                            {/* Name and Title */}
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {testimonial.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {testimonial.title}
                                </p>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="flex flex-col items-center w-full">
                            <p className="text-gray-700  text-left">
                                {testimonial.quote}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action Section */}
            <div className="text-center bg-gradient-to-b from-gray-300 to-white h-[30vh] flex flex-col items-center justify-center rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Don&apos;t Let Business Challenges Hold You Back. Reach out to us today!
                </h3>
                <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                    Book a Discovery Call →
                </button>
            </div>
        </div>
    );
}
