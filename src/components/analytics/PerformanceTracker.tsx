'use client';

import { useEffect } from 'react';
import { usePerformance } from '@/context/CookieContext';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor(private enabled: boolean) {
    if (this.enabled && 'performance' in window) {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Track navigation timing
    this.trackNavigationTiming();
    
    // Track paint timing
    this.trackPaintTiming();
    
    // Track Largest Contentful Paint
    this.trackLCP();
    
    // Track First Input Delay
    this.trackFID();
    
    // Track Cumulative Layout Shift
    this.trackCLS();

    console.log('Performance monitoring initialized');
  }

  private trackNavigationTiming() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        this.reportMetric('page_load_time', this.metrics.pageLoadTime);
        this.reportMetric('dom_content_loaded', this.metrics.domContentLoaded);
      }
    });
  }

  private trackPaintTiming() {
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-paint') {
          this.metrics.firstPaint = entry.startTime;
          this.reportMetric('first_paint', entry.startTime);
        }
        if (entry.name === 'first-contentful-paint') {
          this.metrics.firstContentfulPaint = entry.startTime;
          this.reportMetric('first_contentful_paint', entry.startTime);
        }
      }
    });
    
    paintObserver.observe({ entryTypes: ['paint'] });
    this.observers.push(paintObserver);
  }

  private trackLCP() {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      this.reportMetric('largest_contentful_paint', lastEntry.startTime);
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(lcpObserver);
  }

  private trackFID() {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any; // PerformanceEventTiming not fully supported in TypeScript
        const fid = fidEntry.processingStart - fidEntry.startTime;
        this.metrics.firstInputDelay = fid;
        this.reportMetric('first_input_delay', fid);
      }
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.push(fidObserver);
  }

  private trackCLS() {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.cumulativeLayoutShift = clsValue;
      this.reportMetric('cumulative_layout_shift', clsValue);
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(clsObserver);
  }

  private reportMetric(name: string, value: number) {
    // Log to console for development
    console.log(`Performance Metric - ${name}:`, Math.round(value), 'ms');
    
    // Store in localStorage for analysis
    const performanceData = JSON.parse(localStorage.getItem('spear-hammer-performance') || '{}');
    performanceData[name] = {
      value: Math.round(value),
      timestamp: Date.now(),
      url: window.location.pathname
    };
    localStorage.setItem('spear-hammer-performance', JSON.stringify(performanceData));

    // Send to analytics if enabled
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        page_path: window.location.pathname
      });
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public disable() {
    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    // Clear stored performance data
    localStorage.removeItem('spear-hammer-performance');
    
    console.log('Performance monitoring disabled');
  }
}

let performanceMonitor: PerformanceMonitor | null = null;

export function PerformanceTracker() {
  const performanceEnabled = usePerformance();

  useEffect(() => {
    if (performanceEnabled) {
      if (!performanceMonitor) {
        performanceMonitor = new PerformanceMonitor(true);
      }
    } else {
      if (performanceMonitor) {
        performanceMonitor.disable();
        performanceMonitor = null;
      }
    }

    return () => {
      if (performanceMonitor && !performanceEnabled) {
        performanceMonitor.disable();
        performanceMonitor = null;
      }
    };
  }, [performanceEnabled]);

  return null;
}

// Hook to get current performance metrics
export function usePerformanceMetrics() {
  const performanceEnabled = usePerformance();
  
  if (!performanceEnabled || !performanceMonitor) {
    return null;
  }
  
  return performanceMonitor.getMetrics();
}