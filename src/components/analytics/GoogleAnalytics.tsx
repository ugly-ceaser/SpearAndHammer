'use client';

import { useEffect } from 'react';
import { useAnalytics, usePerformance } from '@/context/CookieContext';
import { GA_MEASUREMENT_ID, updateConsentMode } from '@/lib/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const analyticsEnabled = useAnalytics();
  const performanceEnabled = usePerformance();

  useEffect(() => {
    if (analyticsEnabled && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
      // Initialize Google Analytics
      const script1 = document.createElement('script');
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `;
      document.head.appendChild(script2);

      // Update consent mode
      updateConsentMode('granted');
      
      console.log('Analytics cookies enabled - Google Analytics initialized');
      
      return () => {
        // Cleanup scripts when analytics is disabled
        const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
        scripts.forEach(script => script.remove());
      };
    } else {
      // Disable Google Analytics
      updateConsentMode('denied');
      console.log('Analytics cookies disabled');
    }
  }, [analyticsEnabled]);

  useEffect(() => {
    if (performanceEnabled) {
      // Initialize performance monitoring
      console.log('Performance cookies enabled - Performance monitoring initialized');
      
      // Example: Web Vitals tracking
      if ('performance' in window) {
        // Track page load time
        window.addEventListener('load', () => {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          console.log('Page load time:', loadTime + 'ms');
          
          // You could send this to your analytics service
          if (analyticsEnabled && typeof window.gtag === 'function') {
            window.gtag('event', 'timing_complete', {
              name: 'load',
              value: loadTime
            });
          }
        });
      }
    } else {
      console.log('Performance cookies disabled');
    }
  }, [performanceEnabled, analyticsEnabled]);

  return null;
}