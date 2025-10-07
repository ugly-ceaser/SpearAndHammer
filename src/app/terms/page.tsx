import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Spear & Hammer",
  description: "Read our terms of service for using Spear & Hammer's software development and training services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="w-[80vw] mx-auto px-4 py-8 md:py-12 mt-[15vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative text-center mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform rotate-1 scale-105"></div>
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-black to-gray-800 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              The legal framework governing our services and your responsibilities.
            </p>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600 text-sm">Last updated: October 7, 2025</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <div className="space-y-8">
            
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">1. Acceptance of Terms</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-medium text-green-800 mb-2">✅ Agreement</p>
                  <p className="text-green-700">
                    By accessing and using Spear & Hammer&apos;s services, you accept and agree to be bound by 
                    the terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">2. Services Provided</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Spear & Hammer provides the following services:</p>
                <div className="grid gap-3 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Software development and custom application creation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Web and mobile application development</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>IT training and professional development programs</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Technical consultation and advisory services</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Corporate training and enterprise solutions</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Responsibilities</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>As a user of our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information when requested</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in any activity that could harm our systems or other users</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Payment and Refund Policy</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Payment terms are specified in individual service agreements. For training programs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full payment is required before course commencement</li>
                  <li>Refunds are available within 7 days of course start with valid reason</li>
                  <li>No refunds after 25% course completion</li>
                  <li>Corporate training payments are subject to separate agreements</li>
                </ul>
                <p>
                  For software development projects, payment schedules are outlined in project contracts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All content, materials, and intellectual property provided by Spear & Hammer remain 
                  our exclusive property unless otherwise agreed in writing. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Training materials and course content</li>
                  <li>Software tools and methodologies</li>
                  <li>Documentation and technical resources</li>
                  <li>Proprietary frameworks and solutions</li>
                </ul>
                <p>
                  Custom software developed for clients becomes the client&apos;s property upon full payment, 
                  unless otherwise specified in the project agreement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Limitation of Liability</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Spear & Hammer shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including without limitation, loss of profits, 
                  data, use, goodwill, or other intangible losses resulting from your use of our services.
                </p>
                <p>
                  Our total liability shall not exceed the amount paid by you for the specific service 
                  giving rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Privacy and Data Protection</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand 
                  how we collect, use, and protect your information. By using our services, you 
                  consent to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Termination</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  We may terminate or suspend your access to our services immediately, without prior 
                  notice or liability, for any reason whatsoever, including without limitation if you 
                  breach the Terms.
                </p>
                <p>
                  You may terminate your account at any time by contacting us. Upon termination, 
                  your right to use the service will cease immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  These Terms shall be interpreted and governed by the laws of Nigeria. Any disputes 
                  arising from these terms shall be resolved through arbitration in Lagos, Nigeria.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Information</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">Legal Email</p>
                        <p className="text-blue-700">legal@spearhammer.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">Phone</p>
                        <p className="text-blue-700">+234 4566 543 739</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">Address</p>
                        <p className="text-blue-700">Lagos, Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Changes to Terms</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision 
                  is material, we will try to provide at least 30 days notice prior to any new terms 
                  taking effect.
                </p>
                <p>
                  By continuing to access or use our service after those revisions become effective, 
                  you agree to be bound by the revised terms.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}