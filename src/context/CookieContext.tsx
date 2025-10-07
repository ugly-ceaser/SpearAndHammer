'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functionality: boolean;
  analytics: boolean;
  consentGiven: boolean;
  timestamp: number;
}

interface CookieContextType {
  preferences: CookiePreferences | null;
  hasConsent: boolean;
  updatePreferences: (newPreferences: Partial<CookiePreferences>) => void;
  resetConsent: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const defaultPreferences: CookiePreferences = {
  essential: true,
  performance: false,
  functionality: false,
  analytics: false,
  consentGiven: false,
  timestamp: 0
};

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedPreferences = localStorage.getItem('spear-hammer-cookie-consent');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences) as CookiePreferences;
        setPreferences(parsed);
      } catch {
        // Invalid JSON, reset
        localStorage.removeItem('spear-hammer-cookie-consent');
        setPreferences(null);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updatedPreferences: CookiePreferences = {
      ...defaultPreferences,
      ...preferences,
      ...newPreferences,
      essential: true, // Always true
      consentGiven: true,
      timestamp: Date.now()
    };

    setPreferences(updatedPreferences);
    if (mounted) {
      localStorage.setItem('spear-hammer-cookie-consent', JSON.stringify(updatedPreferences));
    }
  };

  const resetConsent = () => {
    setPreferences(null);
    if (mounted) {
      localStorage.removeItem('spear-hammer-cookie-consent');
    }
  };

  const hasConsent = preferences?.consentGiven ?? false;

  const contextValue: CookieContextType = {
    preferences,
    hasConsent,
    updatePreferences,
    resetConsent
  };

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}

// Utility hooks for specific cookie types
export function useAnalytics() {
  const { preferences } = useCookies();
  return preferences?.analytics ?? false;
}

export function usePerformance() {
  const { preferences } = useCookies();
  return preferences?.performance ?? false;
}

export function useFunctionality() {
  const { preferences } = useCookies();
  return preferences?.functionality ?? false;
}