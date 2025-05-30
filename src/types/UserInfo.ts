export interface BrowserInfo {
  name: string;
  version: string;
  language: string;
  cookiesEnabled: boolean;
  userAgent: string;
  plugins: string[];
  doNotTrack: boolean;
  maxTouchPoints: number;
  pdfViewerEnabled: boolean;
}

export interface SystemInfo {
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
}

export interface NetworkInfo {
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  online: boolean;
}

export interface LocationInfo {
  timezone: string;
  language: string;
  languages: string[];
  region?: string;
}

export interface PerformanceInfo {
  navigationStart?: number;
  loadTime?: number;
  domInteractive?: number;
  domComplete?: number;
  memoryUsage?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
}

export interface Features {
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
}

export interface MediaPreferences {
  prefersDarkMode: boolean;
  prefersReducedMotion: boolean;
  prefersReducedData: boolean;
  prefersContrast: 'high' | 'low' | 'no-preference';
  colorScheme: 'dark' | 'light' | 'no-preference';
}

export interface MarketingInfo {
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
    colorPreference: 'dark' | 'light' | 'auto';
    fontScale: number;
    reducedMotion: boolean;
    prefers3D: boolean;
    prefersMinimalUI: boolean;
  };
  userSegment: {
    deviceValue: 'high' | 'medium' | 'low';
    connectionQuality: 'excellent' | 'good' | 'medium' | 'poor';
    technicalProficiency: 'advanced' | 'intermediate' | 'basic';
    accessibilityNeeds: string[];
  };
  session: {
    referrer?: string;
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
}

export interface UserInfo {
  browser: BrowserInfo;
  system: SystemInfo;
  network: NetworkInfo;
  location: LocationInfo;
  performance: PerformanceInfo;
  features: Features;
  media: MediaPreferences;
  marketing: MarketingInfo;
} 