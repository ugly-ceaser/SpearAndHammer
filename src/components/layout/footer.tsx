'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        setEmail("");
    };

    // Don't render the form until client-side hydration is complete
    if (!mounted) {
        return null;
    }

    return (
        <footer className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Newsletter Subscription */}
                    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
                        <h3 className="text-lg font-bold mb-2 text-gray-800">SUBSCRIBE TO OUR NEWSLETTER</h3>
                        <p className="text-gray-600 mb-4">Sign Up and enjoy our services better.</p>
                    </div>

                    {/* Newsletter form */}
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <form onSubmit={handleSubmit} className="flex w-full max-w-md">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-black text-white border border-black rounded-l-lg focus:outline-none  placeholder-gray-400"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors border-l border-gray-600"
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex gap-6 items-center justify-center">
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Image src="icons/x.svg" alt="Twitter(X)" width={24} height={24} />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Image src="/icons/fb.svg" alt="Facebook" width={24} height={24} />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Image src="icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                        </a>

                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            <Image src="icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                        </a>
                    </div>
                </div>

                 {/* Logo, Contact, and Navigation Section */}
                 <div className="mt-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    {/* Logo and Company Info */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="mb-6">
                            <Image
                                src="/icons/icon.png"
                                alt="Spear & Hammer"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">PHONE AND EMAIL</h3>
                        <a href="mailto:spearhammer@gmail.com" className="text-gray-600 hover:text-gray-800 mb-2">
                            spearhammer@gmail.com
                        </a>
                        <a href="tel:+2344566543739" className="text-gray-600 hover:text-gray-800">
                            +234 4566 543 739
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">PAGES</h3>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <Link href="/about" className="text-gray-600 hover:text-gray-800">
                                About Us
                            </Link>
                            <Link href="/training" className="text-gray-600 hover:text-gray-800">
                                Trainings
                            </Link>
                            <Link href="/projects" className="text-gray-600 hover:text-gray-800">
                                Projects
                            </Link>
                            <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                                Contact Us
                            </Link>
                            <Link href="/privacy" className="text-gray-600 hover:text-gray-800">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright Notice */}
                <div className="mt-12 text-center text-gray-600">
                    <p>COPYRIGHTS 2024. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
