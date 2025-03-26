
// Google Analytics integration

// Function to initialize Google Analytics
export const initGA = (measurementId: string): void => {
  if (typeof window !== 'undefined' && !window.ga) {
    // Add Google Analytics script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });

    console.log('Google Analytics initialized with ID:', measurementId);
  }
};

// Track page views
export const trackPageView = (path: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.GA_MEASUREMENT_ID || 'G-MEASUREMENT_ID', {
      page_path: path,
    });
    console.log('Page view tracked:', path);
  }
};

// Track user interactions
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log('Event tracked:', { category, action, label, value });
  }
};

// Track user events with custom dimensions
export const trackCustomEvent = (
  eventName: string,
  eventParams: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('Custom event tracked:', { eventName, eventParams });
  }
};

// Track exceptions
export const trackException = (description: string, fatal = false): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description,
      fatal,
    });
    console.log('Exception tracked:', { description, fatal });
  }
};

// Return data from Google Analytics (mock implementation)
export const getAnalyticsData = async (): Promise<any> => {
  // In a real implementation, this would make API calls to the GA API
  // For demo purposes, we'll return mock data
  
  return {
    visitors: {
      today: 243,
      yesterday: 198,
      thisWeek: 1432,
      lastWeek: 1387,
      change: 3.2,
    },
    pageViews: {
      today: 567,
      yesterday: 489,
      thisWeek: 3245,
      lastWeek: 3102,
      change: 4.6,
    },
    sessions: {
      today: 312,
      yesterday: 287,
      thisWeek: 1876,
      lastWeek: 1798,
      change: 4.3,
    },
    topPages: [
      { path: '/dashboard', views: 432, avgTime: '2m 35s' },
      { path: '/production', views: 289, avgTime: '3m 12s' },
      { path: '/orders', views: 187, avgTime: '1m 48s' },
      { path: '/analytics', views: 143, avgTime: '4m 03s' },
      { path: '/settings', views: 76, avgTime: '1m 22s' },
    ],
    deviceBreakdown: {
      desktop: 68,
      mobile: 24,
      tablet: 8,
    },
    bounceRate: 32.4,
    avgSessionDuration: '3m 17s',
  };
};

// Augment the Window interface to include Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    ga?: (...args: any[]) => void;
  }
}
