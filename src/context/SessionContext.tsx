'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useFunctionality } from '@/context/CookieContext';

export interface SessionData {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  currentPage: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  timeZone: string;
}

interface SessionContextType {
  session: SessionData | null;
  updateActivity: () => void;
  trackPageView: (page: string) => void;
  getSessionDuration: () => number;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const functionalityEnabled = useFunctionality();
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    if (functionalityEnabled) {
      initializeSession();
    } else {
      clearSession();
    }
  }, [functionalityEnabled]);

  const generateSessionId = (): string => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const initializeSession = () => {
    const existingSession = localStorage.getItem('spear-hammer-session');
    const now = Date.now();
    
    if (existingSession) {
      try {
        const parsedSession = JSON.parse(existingSession) as SessionData;
        
        // Check if session is still valid (less than 30 minutes of inactivity)
        const thirtyMinutes = 30 * 60 * 1000;
        if (now - parsedSession.lastActivity < thirtyMinutes) {
          // Update last activity and continue session
          const updatedSession = {
            ...parsedSession,
            lastActivity: now,
            currentPage: window.location.pathname
          };
          setSession(updatedSession);
          localStorage.setItem('spear-hammer-session', JSON.stringify(updatedSession));
          console.log('Session restored:', updatedSession.sessionId);
          return;
        }
      } catch {
        // Invalid session data, create new session
      }
    }

    // Create new session
    const newSession: SessionData = {
      sessionId: generateSessionId(),
      startTime: now,
      lastActivity: now,
      pageViews: 1,
      currentPage: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    setSession(newSession);
    localStorage.setItem('spear-hammer-session', JSON.stringify(newSession));
    console.log('New session created:', newSession.sessionId);
  };

  const clearSession = () => {
    setSession(null);
    localStorage.removeItem('spear-hammer-session');
    console.log('Session cleared');
  };

  const updateActivity = useCallback(() => {
    if (!functionalityEnabled || !session) return;

    const updatedSession = {
      ...session,
      lastActivity: Date.now()
    };

    setSession(updatedSession);
    localStorage.setItem('spear-hammer-session', JSON.stringify(updatedSession));
  }, [functionalityEnabled, session]);

  const trackPageView = useCallback((page: string) => {
    if (!functionalityEnabled || !session) return;

    // Prevent tracking the same page multiple times in quick succession
    if (session.currentPage === page) return;

    const updatedSession = {
      ...session,
      currentPage: page,
      pageViews: session.pageViews + 1,
      lastActivity: Date.now()
    };

    setSession(updatedSession);
    localStorage.setItem('spear-hammer-session', JSON.stringify(updatedSession));
    
    console.log(`Page view tracked: ${page} (Total: ${updatedSession.pageViews})`);
  }, [functionalityEnabled, session]);

  const getSessionDuration = useCallback((): number => {
    if (!session) return 0;
    return Date.now() - session.startTime;
  }, [session]);

  const contextValue: SessionContextType = useMemo(() => ({
    session,
    updateActivity,
    trackPageView,
    getSessionDuration
  }), [session, updateActivity, trackPageView, getSessionDuration]);

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

// Activity tracker component
export function ActivityTracker() {
  const { updateActivity } = useSession();
  const functionalityEnabled = useFunctionality();

  useEffect(() => {
    if (!functionalityEnabled) return;

    const handleActivity = () => updateActivity();
    
    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Throttle activity updates to once per minute
    let lastUpdate = 0;
    const throttledUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate > 60000) { // 1 minute
        handleActivity();
        lastUpdate = now;
      }
    };

    events.forEach(event => {
      document.addEventListener(event, throttledUpdate, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledUpdate);
      });
    };
  }, [updateActivity, functionalityEnabled]);

  return null;
}