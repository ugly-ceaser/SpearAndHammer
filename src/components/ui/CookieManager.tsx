'use client';

import { useState } from 'react';
import { useCookies } from '@/context/CookieContext';
import { LoadingLink } from './LoadingLink';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functionality: boolean;
  analytics: boolean;
  consentGiven: boolean;
  timestamp: number;
}

export default function CookieManager() {
  const { preferences, updatePreferences, resetConsent } = useCookies();
  const [showManager, setShowManager] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<Partial<CookiePreferences>>({
    performance: preferences?.performance ?? false,
    functionality: preferences?.functionality ?? false,
    analytics: preferences?.analytics ?? false,
  });

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential' || key === 'consentGiven' || key === 'timestamp') return;
    
    setTempPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const savePreferences = () => {
    updatePreferences(tempPreferences);
    setShowManager(false);
  };

  const resetPreferences = () => {
    resetConsent();
    setShowManager(false);
  };

  if (!preferences?.consentGiven) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          No cookie preferences set. The cookie consent banner will appear on page reload.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Cookie Preferences</h3>
          <p className="text-sm text-gray-600">
            Manage your cookie preferences. Changes will take effect immediately.
          </p>
        </div>
        <button
          onClick={() => setShowManager(!showManager)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {showManager ? 'Hide Settings' : 'Manage Cookies'}
        </button>
      </div>

      {/* Current Preferences Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-green-600 font-semibold text-sm mb-1">Essential</div>
          <div className="text-green-800 text-xs">Always Active</div>
        </div>
        <div className={`text-center p-3 rounded-lg ${preferences.performance ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <div className={`font-semibold text-sm mb-1 ${preferences.performance ? 'text-blue-600' : 'text-gray-600'}`}>
            Performance
          </div>
          <div className={`text-xs ${preferences.performance ? 'text-blue-800' : 'text-gray-500'}`}>
            {preferences.performance ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        <div className={`text-center p-3 rounded-lg ${preferences.functionality ? 'bg-purple-50' : 'bg-gray-50'}`}>
          <div className={`font-semibold text-sm mb-1 ${preferences.functionality ? 'text-purple-600' : 'text-gray-600'}`}>
            Functionality
          </div>
          <div className={`text-xs ${preferences.functionality ? 'text-purple-800' : 'text-gray-500'}`}>
            {preferences.functionality ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        <div className={`text-center p-3 rounded-lg ${preferences.analytics ? 'bg-orange-50' : 'bg-gray-50'}`}>
          <div className={`font-semibold text-sm mb-1 ${preferences.analytics ? 'text-orange-600' : 'text-gray-600'}`}>
            Analytics
          </div>
          <div className={`text-xs ${preferences.analytics ? 'text-orange-800' : 'text-gray-500'}`}>
            {preferences.analytics ? 'Enabled' : 'Disabled'}
          </div>
        </div>
      </div>

      {showManager && (
        <div className="border-t border-gray-200 pt-6">
          <div className="grid gap-4 mb-6">
            {/* Essential Cookies */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="w-4 h-4 text-green-600 bg-green-100 border-green-300 rounded focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-800 mb-1">Essential Cookies</h4>
                <p className="text-sm text-green-700">
                  Required for the website to function properly. These cannot be disabled.
                </p>
              </div>
            </div>

            {/* Performance Cookies */}
            <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={tempPreferences.performance}
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
                  checked={tempPreferences.functionality}
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
                  checked={tempPreferences.analytics}
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

          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <LoadingLink 
                href="/cookies" 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Learn More
              </LoadingLink>
              <button
                onClick={resetPreferences}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Reset All
              </button>
            </div>
            <button
              onClick={savePreferences}
              className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(preferences.timestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}