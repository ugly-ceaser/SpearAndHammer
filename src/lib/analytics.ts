// Google Analytics Configuration
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics 4 Measurement ID

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID';

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title
    });
  }
};

// Track user interactions
export const trackUserInteraction = (action: string, category: string, label?: string) => {
  trackEvent('user_interaction', {
    event_category: category,
    event_label: label,
    action: action
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success
  });
};

// Track downloads
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  });
};

// Track outbound links
export const trackOutboundLink = (url: string) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url
  });
};

// Configure consent mode
export const updateConsentMode = (
  analyticsStorage: 'granted' | 'denied',
  adStorage: 'granted' | 'denied' = 'denied'
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: analyticsStorage,
      ad_storage: adStorage
    });
  }
};