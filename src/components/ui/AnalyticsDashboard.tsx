'use client';

import { useState, useEffect } from 'react';
import { useCookies } from '@/context/CookieContext';
import { useSession } from '@/context/SessionContext';
import { usePerformanceMetrics } from '@/components/analytics/PerformanceTracker';

interface AnalyticsData {
  performance: any;
  session: any;
  userPreferences: any;
}

export default function AnalyticsDashboard() {
  const { preferences } = useCookies();
  const { session } = useSession();
  const performanceMetrics = usePerformanceMetrics();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    performance: {},
    session: null,
    userPreferences: {}
  });

  useEffect(() => {
    // Load stored analytics data
    const performance = JSON.parse(localStorage.getItem('spear-hammer-performance') || '{}');
    const userPrefs = JSON.parse(localStorage.getItem('spear-hammer-user-preferences') || '{}');
    
    setAnalyticsData({
      performance,
      session,
      userPreferences: userPrefs
    });
  }, [session]);

  const clearAnalyticsData = () => {
    localStorage.removeItem('spear-hammer-performance');
    localStorage.removeItem('spear-hammer-user-preferences');
    setAnalyticsData({
      performance: {},
      session: null,
      userPreferences: {}
    });
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Analytics Dashboard</h3>
          <p className="text-sm text-gray-600">
            View the data being collected based on your cookie preferences.
          </p>
        </div>
        <button
          onClick={clearAnalyticsData}
          className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          Clear Data
        </button>
      </div>

      {/* Cookie Preferences Status */}
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-800 mb-4">Cookie Preferences Status</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-green-600 font-semibold text-sm">Essential</div>
            <div className="text-green-800 text-xs">Always Active</div>
          </div>
          <div className={`p-3 rounded-lg ${preferences?.performance ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <div className={`font-semibold text-sm ${preferences?.performance ? 'text-blue-600' : 'text-gray-600'}`}>
              Performance
            </div>
            <div className={`text-xs ${preferences?.performance ? 'text-blue-800' : 'text-gray-500'}`}>
              {preferences?.performance ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${preferences?.functionality ? 'bg-purple-50' : 'bg-gray-50'}`}>
            <div className={`font-semibold text-sm ${preferences?.functionality ? 'text-purple-600' : 'text-gray-600'}`}>
              Functionality
            </div>
            <div className={`text-xs ${preferences?.functionality ? 'text-purple-800' : 'text-gray-500'}`}>
              {preferences?.functionality ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${preferences?.analytics ? 'bg-orange-50' : 'bg-gray-50'}`}>
            <div className={`font-semibold text-sm ${preferences?.analytics ? 'text-orange-600' : 'text-gray-600'}`}>
              Analytics
            </div>
            <div className={`text-xs ${preferences?.analytics ? 'text-orange-800' : 'text-gray-500'}`}>
              {preferences?.analytics ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>

      {/* Session Data */}
      {preferences?.functionality && session && (
        <div className="mb-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Current Session Data</h4>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-purple-700"><strong>Session ID:</strong> {session.sessionId}</p>
                <p className="text-sm text-purple-700"><strong>Start Time:</strong> {formatTimestamp(session.startTime)}</p>
                <p className="text-sm text-purple-700"><strong>Duration:</strong> {formatDuration(Date.now() - session.startTime)}</p>
              </div>
              <div>
                <p className="text-sm text-purple-700"><strong>Page Views:</strong> {session.pageViews}</p>
                <p className="text-sm text-purple-700"><strong>Current Page:</strong> {session.currentPage}</p>
                <p className="text-sm text-purple-700"><strong>Screen:</strong> {session.screenResolution}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Data */}
      {preferences?.performance && Object.keys(analyticsData.performance).length > 0 && (
        <div className="mb-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Performance Metrics</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analyticsData.performance).map(([key, data]: [string, any]) => (
                <div key={key} className="text-sm">
                  <p className="text-blue-800 font-medium capitalize">
                    {key.replace(/_/g, ' ')}
                  </p>
                  <p className="text-blue-700">{data.value}ms</p>
                  <p className="text-blue-600 text-xs">{data.url}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Preferences */}
      {preferences?.functionality && Object.keys(analyticsData.userPreferences).length > 0 && (
        <div className="mb-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">User Preferences</h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(analyticsData.userPreferences).map(([key, value]: [string, any]) => (
                <div key={key} className="text-sm">
                  <p className="text-green-800 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-green-700">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Status */}
      {preferences?.analytics && (
        <div className="mb-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Analytics Tracking</h4>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-orange-700 text-sm">Google Analytics is active</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-orange-700 text-sm">Page views are being tracked</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-orange-700 text-sm">User interactions are being monitored</p>
            </div>
          </div>
        </div>
      )}

      {/* Data Explanation */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-3">What This Data Is Used For</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Essential:</strong> Required for basic website functionality, security, and user authentication.</p>
          {preferences?.performance && (
            <p><strong>Performance:</strong> Helps us understand page load times and optimize website speed.</p>
          )}
          {preferences?.functionality && (
            <p><strong>Functionality:</strong> Remembers your preferences to provide a personalized experience.</p>
          )}
          {preferences?.analytics && (
            <p><strong>Analytics:</strong> Helps us understand user behavior to improve our services and content.</p>
          )}
        </div>
      </div>
    </div>
  );
}