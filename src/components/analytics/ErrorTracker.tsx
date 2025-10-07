'use client';

import { useEffect } from 'react';
import { usePerformance, useAnalytics } from '@/context/CookieContext';

interface ErrorInfo {
  message: string;
  filename: string;
  lineno: number;
  colno: number;
  error: Error | null;
  timestamp: number;
  userAgent: string;
  url: string;
}

class ErrorTrackingService {
  private errors: ErrorInfo[] = [];
  private maxErrors = 50; // Limit stored errors

  constructor(private performanceEnabled: boolean, private analyticsEnabled: boolean) {
    if (this.performanceEnabled) {
      this.initializeErrorTracking();
    }
  }

  private initializeErrorTracking() {
    // Track JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        filename: '',
        lineno: 0,
        colno: 0,
        error: event.reason instanceof Error ? event.reason : null,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    console.log('Error tracking initialized');
  }

  private logError(errorInfo: ErrorInfo) {
    // Add to local storage
    this.errors.push(errorInfo);
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Store in localStorage
    localStorage.setItem('spear-hammer-errors', JSON.stringify(this.errors));

    // Log to console in development
    console.error('Error tracked:', {
      message: errorInfo.message,
      file: errorInfo.filename,
      line: errorInfo.lineno,
      timestamp: new Date(errorInfo.timestamp).toISOString()
    });

    // Send to analytics if enabled
    if (this.analyticsEnabled && typeof window.gtag === 'function') {
      window.gtag('event', 'exception', {
        description: errorInfo.message,
        fatal: false,
        custom_map: {
          filename: errorInfo.filename,
          line_number: errorInfo.lineno
        }
      });
    }
  }

  public getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  public clearErrors() {
    this.errors = [];
    localStorage.removeItem('spear-hammer-errors');
    console.log('Error log cleared');
  }

  public disable() {
    // Clear stored errors
    this.clearErrors();
    console.log('Error tracking disabled');
  }
}

let errorTracker: ErrorTrackingService | null = null;

export function ErrorTracker() {
  const performanceEnabled = usePerformance();
  const analyticsEnabled = useAnalytics();

  useEffect(() => {
    if (performanceEnabled) {
      if (!errorTracker) {
        errorTracker = new ErrorTrackingService(performanceEnabled, analyticsEnabled);
      }
    } else {
      if (errorTracker) {
        errorTracker.disable();
        errorTracker = null;
      }
    }

    return () => {
      if (errorTracker && !performanceEnabled) {
        errorTracker.disable();
        errorTracker = null;
      }
    };
  }, [performanceEnabled, analyticsEnabled]);

  return null;
}

// Hook to access error data
export function useErrorTracking() {
  const performanceEnabled = usePerformance();
  
  const getErrors = () => {
    if (!performanceEnabled || !errorTracker) {
      return [];
    }
    return errorTracker.getErrors();
  };

  const clearErrors = () => {
    if (errorTracker) {
      errorTracker.clearErrors();
    }
  };

  return {
    getErrors,
    clearErrors,
    isEnabled: performanceEnabled
  };
}