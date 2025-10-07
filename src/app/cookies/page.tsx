import type { Metadata } from "next";
import CookieManager from "@/components/ui/CookieManager";
import AnalyticsDashboard from "@/components/ui/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Cookie Policy - Spear & Hammer",
  description: "Learn about how Spear & Hammer uses cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="w-[80vw] mx-auto px-4 py-8 md:py-12 mt-[15vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative text-center mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform -rotate-1 scale-105"></div>
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-black to-gray-800 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Understanding how we use cookies to enhance your browsing experience.
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
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">1. What Are Cookies?</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="font-medium text-yellow-800 mb-2">🍪 Cookie Definition</p>
                  <p className="text-yellow-700 mb-3">
                    Cookies are small text files that are stored on your computer or mobile device when 
                    you visit a website. They allow the website to recognize your device and store some 
                    information about your preferences or past actions.
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-medium text-orange-800 mb-2">🎯 Our Usage</p>
                  <p className="text-orange-700">
                    Spear & Hammer uses cookies to enhance your browsing experience, analyze site traffic, 
                    and provide personalized content and services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Types of Cookies We Use</h2>
              <div className="text-gray-600 leading-relaxed space-y-6">
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-red-800">Essential Cookies</h3>
                  </div>
                  <p className="text-red-700 mb-3">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation, access to secure areas, and form submissions.
                  </p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 text-sm">Session management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 text-sm">Security features</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 text-sm">Form data retention</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800">Performance Cookies</h3>
                  </div>
                  <p className="text-blue-700 mb-3">
                    These cookies collect information about how visitors use our website to help us 
                    improve how our website works.
                  </p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 text-sm">Page load times</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 text-sm">Popular content tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 text-sm">Error monitoring</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-green-800">Functionality Cookies</h3>
                  </div>
                  <p className="text-green-700 mb-3">
                    These cookies remember choices you make to improve your experience.
                  </p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm">Language preferences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm">User interface customization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-sm">Accessibility settings</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-purple-800">Analytics Cookies</h3>
                  </div>
                  <p className="text-purple-700 mb-3">
                    We use analytics cookies to understand how visitors interact with our website.
                  </p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-600 text-sm">Google Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-600 text-sm">User behavior tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-600 text-sm">Conversion measurement</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Third-Party Cookies</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Some cookies on our website are set by third-party services. We use these services 
                  to enhance functionality and analyze usage:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> For website traffic analysis</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
                  <li><strong>Content Delivery Networks:</strong> For improved performance</li>
                </ul>
                <p>
                  These third parties may use cookies for their own purposes. Please refer to their 
                  privacy policies for more information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Managing Your Cookie Preferences</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  You have several options for managing cookies:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Browser Settings</h3>
                    <p>
                      Most web browsers allow you to control cookies through their settings. You can 
                      usually find these controls in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Opt-Out Tools</h3>
                    <p>
                      You can opt out of analytics cookies by visiting the respective provider&apos;s 
                      opt-out page:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">Google Analytics Opt-out</a></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Disabling certain cookies may affect the functionality 
                    of our website and your user experience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Cookie Duration</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Cookies can be classified by their duration:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Session Cookies:</strong> These are temporary cookies that expire when 
                    you close your browser.
                  </li>
                  <li>
                    <strong>Persistent Cookies:</strong> These remain on your device for a specified 
                    period or until you delete them manually.
                  </li>
                </ul>
                <p>
                  Most of our cookies are persistent and typically expire after 1-2 years, though 
                  some may have shorter or longer durations depending on their purpose.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Updates to This Policy</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons. We will notify 
                  you of any material changes by posting the updated policy on our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Contact Us</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  If you have any questions about our use of cookies or this Cookie Policy, 
                  please contact us:
                </p>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-100 p-6 rounded-xl border border-yellow-200">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">Privacy Email</p>
                        <p className="text-yellow-700">privacy@spearhammer.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">Phone</p>
                        <p className="text-yellow-700">+234 4566 543 739</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">Address</p>
                        <p className="text-yellow-700">Lagos, Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Your Consent</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  By using our website, you consent to the use of cookies in accordance with this 
                  Cookie Policy. If you do not agree to our use of cookies, you should set your 
                  browser settings accordingly or refrain from using our website.
                </p>
              </div>
            </section>

          </div>

          {/* Cookie Manager Section */}
          <div className="mt-12">
            <CookieManager />
          </div>

          {/* Analytics Dashboard Section */}
          <div className="mt-12">
            <AnalyticsDashboard />
          </div>

        </div>
      </div>
    </div>
  );
}