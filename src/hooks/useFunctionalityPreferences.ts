'use client';

import { useEffect, useState } from 'react';
import { useFunctionality } from '@/context/CookieContext';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  fontSize: 'medium',
  reducedMotion: false
};

export function FunctionalityManager() {
  const functionalityEnabled = useFunctionality();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    if (functionalityEnabled) {
      // Load user preferences from localStorage
      const savedPrefs = localStorage.getItem('spear-hammer-user-preferences');
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs) as UserPreferences;
          setPreferences(parsed);
          applyPreferences(parsed);
        } catch {
          console.log('Invalid user preferences, using defaults');
        }
      }
      console.log('Functionality cookies enabled - User preferences loaded');
    } else {
      // Reset to defaults when functionality cookies are disabled
      setPreferences(defaultPreferences);
      applyPreferences(defaultPreferences);
      localStorage.removeItem('spear-hammer-user-preferences');
      console.log('Functionality cookies disabled - Preferences reset to defaults');
    }
  }, [functionalityEnabled]);

  const applyPreferences = (prefs: UserPreferences) => {
    // Apply theme
    const root = document.documentElement;
    if (prefs.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply font size
    root.classList.remove('text-small', 'text-medium', 'text-large');
    root.classList.add(`text-${prefs.fontSize}`);

    // Apply reduced motion
    if (prefs.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // Set language attribute
    document.documentElement.lang = prefs.language;
  };

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    if (!functionalityEnabled) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('spear-hammer-user-preferences', JSON.stringify(newPreferences));
    applyPreferences(newPreferences);
  };

  return {
    preferences,
    updatePreference,
    functionalityEnabled
  };
}

// Hook for components to use functionality features
export function useFunctionalityPreferences() {
  return FunctionalityManager();
}