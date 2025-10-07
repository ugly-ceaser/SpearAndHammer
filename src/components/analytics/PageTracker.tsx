'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { useAnalytics } from '@/context/CookieContext';

export function PageTracker() {
  const router = useRouter();
  const { trackPageView } = useSession();
  const analyticsEnabled = useAnalytics();
  const initializedRef = useRef(false);
  const currentPathRef = useRef('');

  useEffect(() => {
    // Only track initial page load once
    if (!initializedRef.current) {
      const currentPath = window.location.pathname;
      currentPathRef.current = currentPath;
      trackPageView(currentPath);
      initializedRef.current = true;
      
      if (analyticsEnabled && typeof window.gtag === 'function') {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: currentPath,
          page_title: document.title
        });
      }
    }
  }, []); // Empty dependency array for initial load only

  useEffect(() => {
    // Track route changes in Next.js
    const handleRouteChange = (url: string) => {
      // Only track if the path actually changed
      if (currentPathRef.current !== url) {
        currentPathRef.current = url;
        trackPageView(url);
        
        if (analyticsEnabled && typeof window.gtag === 'function') {
          window.gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: url,
            page_title: document.title
          });
        }
      }
    };

    // Note: In Next.js 13+ App Router, we need to handle route changes differently
    // This is a simplified version - you might need to adjust based on your routing setup
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(state, title, url) {
      originalPushState.call(history, state, title, url);
      if (typeof url === 'string') {
        handleRouteChange(url);
      }
    };

    history.replaceState = function(state, title, url) {
      originalReplaceState.call(history, state, title, url);
      if (typeof url === 'string') {
        handleRouteChange(url);
      }
    };

    const handlePopState = () => {
      handleRouteChange(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [analyticsEnabled]); // Remove trackPageView from dependencies

  return null;
}