'use client';

import { useState, useEffect } from 'react';
import { LoadingLink } from './LoadingLink';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functionality: boolean;
  analytics: boolean;
  consentGiven: boolean;
  timestamp: number;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always required
  performance: false,
  functionality: false,
  analytics: false,
  consentGiven: false,
  timestamp: 0
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user has already given consent
    const savedPreferences = localStorage.getItem('spear-hammer-cookie-consent');
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences) as CookiePreferences;
      setPreferences(parsed);
      
      // Check if consent is older than 1 year (re-prompt)
      const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
      if (parsed.timestamp < oneYearAgo) {
        setShowBanner(true);
      }
    } else {
      // First time visitor
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updatedPreferences: CookiePreferences = {
      ...preferences,
      ...newPreferences,
      essential: true, // Always true
      consentGiven: true,
      timestamp: Date.now()
    };

    setPreferences(updatedPreferences);
    localStorage.setItem('spear-hammer-cookie-consent', JSON.stringify(updatedPreferences));
    setShowBanner(false);
    setShowDetails(false);

    // Here you would typically initialize analytics/tracking based on preferences
    if (updatedPreferences.analytics) {
      // Initialize Google Analytics or other tracking
      console.log('Analytics enabled');
    }
  };

  const acceptAll = () => {
    savePreferences({
      performance: true,
      functionality: true,
      analytics: true
    });
  };

  const acceptEssentialOnly = () => {
    savePreferences({
      performance: false,
      functionality: false,
      analytics: false
    });
  };

  const handleCustomPreferences = () => {
    savePreferences({
      performance: preferences.performance,
      functionality: preferences.functionality,
      analytics: preferences.analytics
    });
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential' || key === 'consentGiven' || key === 'timestamp') return;
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Don't render on server or if user has already consented
  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
        <div className="w-[80vw] mx-auto p-6">
          {!showDetails ? (
            // Simple Banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Cookie Preferences</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  We use cookies to enhance your browsing experience, analyze site traffic, and provide 
                  personalized content. You can customize your preferences or accept all cookies.
                </p>
                <LoadingLink 
                  href="/cookies" 
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Learn more about our cookie policy
                </LoadingLink>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={acceptEssentialOnly}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Detailed Preferences
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Cookie Preferences</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid gap-4 mb-6">
                {/* Essential Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Performance Cookies */}
                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.performance}
                      onChange={() => togglePreference('performance')}
                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">Performance Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Help us analyze how visitors use our website to improve performance.
                    </p>
                  </div>
                </div>

                {/* Functionality Cookies */}
                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.functionality}
                      onChange={() => togglePreference('functionality')}
                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">Functionality Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Remember your preferences and settings to enhance your experience.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Help us understand visitor behavior and improve our services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={acceptEssentialOnly}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleCustomPreferences}
                  className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}