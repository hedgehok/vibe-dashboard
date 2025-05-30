export interface UserInfo {
  browser: {
    name: string;
    version: string;
    language: string;
    cookiesEnabled: boolean;
    userAgent: string;
    plugins: string[];
    doNotTrack: boolean;
    maxTouchPoints: number;
    pdfViewerEnabled: boolean;
  };
  system: {
    os: string;
    platform: string;
    screenResolution: string;
    deviceType: string;
    deviceMemory?: number;
    cpuCores?: number;
    battery?: {
      level: number;
      charging: boolean;
      chargingTime: number;
      dischargingTime: number;
    };
    colorDepth: number;
    pixelRatio: number;
    maxTextureSize?: number;
  };
  network: {
    connectionType?: string;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
    ip?: string;
    online: boolean;
  };
  location: {
    timezone: string;
    language: string;
    languages: string[];
    region?: string;
  };
  performance: {
    navigationStart?: number;
    loadTime?: number;
    domInteractive?: number;
    domComplete?: number;
    memoryUsage?: {
      jsHeapSizeLimit: number;
      totalJSHeapSize: number;
      usedJSHeapSize: number;
    };
  };
  features: {
    touchScreen: boolean;
    webGL: boolean;
    canvas: boolean;
    webRTC: boolean;
    webGPU: boolean;
    bluetooth: boolean;
    geolocation: boolean;
    notifications: boolean;
    camera: boolean;
    microphone: boolean;
    accelerometer: boolean;
    gyroscope: boolean;
  };
  media: {
    prefersDarkMode: boolean;
    prefersReducedMotion: boolean;
    prefersReducedData: boolean;
    prefersContrast?: 'no-preference' | 'high' | 'low';
    colorScheme: 'dark' | 'light' | 'no-preference';
  };
  marketing: {
    deviceCategory: 'mobile' | 'tablet' | 'desktop';
    browserCategory: 'modern' | 'legacy';
    platform: 'windows' | 'mac' | 'linux' | 'ios' | 'android' | 'other';
    screenCategory: 'small' | 'medium' | 'large' | 'xlarge';
    performanceScore: number;
    engagement: {
      timeOnSite: number;
      pageViews: number;
      scrollDepth: number;
      lastVisit?: Date;
      visitCount: number;
      returningVisitor: boolean;
    };
    capabilities: {
      supportsModernWeb: boolean;
      supportsWebPayments: boolean;
      supportsProgressiveWebApps: boolean;
      supportsWebAssembly: boolean;
      supportsWebWorkers: boolean;
      supportsWebSockets: boolean;
    };
    preferences: {
      colorPreference: 'light' | 'dark' | 'auto';
      fontScale: number;
      reducedMotion: boolean;
      prefers3D: boolean;
      prefersMinimalUI: boolean;
    };
    userSegment: {
      deviceValue: 'low' | 'medium' | 'high';
      connectionQuality: 'poor' | 'medium' | 'good' | 'excellent';
      technicalProficiency: 'basic' | 'intermediate' | 'advanced';
      accessibilityNeeds: string[];
    };
    session: {
      referrer: string;
      entryPage: string;
      landingTime: Date;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmTerm?: string;
      utmContent?: string;
    };
    behavior: {
      mouseMovement: number;
      keyboardInteraction: number;
      touchInteraction: number;
      formInteraction: number;
      mediaInteraction: number;
      copyPasteActions: number;
    };
  };
} 