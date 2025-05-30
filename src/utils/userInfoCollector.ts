import UAParser from 'ua-parser-js';
import { UserInfo } from '../types/UserInfo';

// Функция для получения UTM-параметров из URL
const getUtmParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    utmTerm: urlParams.get('utm_term') || undefined,
    utmContent: urlParams.get('utm_content') || undefined,
  };
};

// Определение категории устройства на основе размера экрана
const getDeviceCategory = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Определение категории браузера
const getBrowserCategory = (browserName: string, browserVersion: string): 'modern' | 'legacy' => {
  const modernBrowsers: Record<string, number> = {
    'Chrome': 90,
    'Firefox': 88,
    'Safari': 14,
    'Edge': 90,
  };
  
  const minVersion = modernBrowsers[browserName];
  if (!minVersion) return 'legacy';
  
  const version = parseInt(browserVersion);
  return !isNaN(version) && version >= minVersion ? 'modern' : 'legacy';
};

// Определение категории экрана
const getScreenCategory = (): 'small' | 'medium' | 'large' | 'xlarge' => {
  const width = window.screen.width;
  if (width < 768) return 'small';
  if (width < 1024) return 'medium';
  if (width < 1440) return 'large';
  return 'xlarge';
};

// Расчет производительности
const calculatePerformanceScore = (performance: Performance): number => {
  const scores = {
    loadTime: 0,
    domInteractive: 0,
    domComplete: 0,
  };

  const maxLoadTime = 5000; // 5 секунд
  const timing = performance.timing;
  
  if (timing) {
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domInteractive = timing.domInteractive - timing.navigationStart;
    const domComplete = timing.domComplete - timing.navigationStart;

    scores.loadTime = Math.max(0, 100 - (loadTime / maxLoadTime * 100));
    scores.domInteractive = Math.max(0, 100 - (domInteractive / maxLoadTime * 100));
    scores.domComplete = Math.max(0, 100 - (domComplete / maxLoadTime * 100));
  }

  return Math.round((scores.loadTime + scores.domInteractive + scores.domComplete) / 3);
};

// Получение данных о посещениях из localStorage
const getVisitData = () => {
  const visitData = localStorage.getItem('visitData');
  if (visitData) {
    return JSON.parse(visitData);
  }
  return {
    visitCount: 0,
    lastVisit: null,
  };
};

// Определение технической подготовленности пользователя
const getTechnicalProficiency = (features: Record<string, boolean>): 'basic' | 'intermediate' | 'advanced' => {
  const score = Object.values(features).filter(Boolean).length;
  if (score < 4) return 'basic';
  if (score < 8) return 'intermediate';
  return 'advanced';
};

export const collectUserInfo = async (): Promise<UserInfo> => {
  const parser = new UAParser();
  const browserResult = parser.getBrowser();
  const osResult = parser.getOS();
  const deviceResult = parser.getDevice();

  // Собираем информацию о плагинах
  const plugins = Array.from(navigator.plugins).map(plugin => plugin.name);

  // Получаем информацию о батарее
  let batteryInfo;
  try {
    if ('getBattery' in navigator) {
      const battery = await (navigator as any).getBattery();
      batteryInfo = {
        level: battery.level * 100,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      };
    }
  } catch (error) {
    console.warn('Battery API не поддерживается');
  }

  // Получаем максимальный размер текстуры WebGL
  let maxTextureSize;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  } catch (error) {
    console.warn('WebGL не поддерживается');
  }

  // Проверяем поддержку различных API
  const checkApiSupport = async (api: string): Promise<boolean> => {
    try {
      switch (api) {
        case 'webgpu':
          return 'gpu' in navigator;
        case 'bluetooth':
          return 'bluetooth' in navigator;
        case 'geolocation':
          return 'geolocation' in navigator;
        case 'notifications':
          return 'Notification' in window;
        case 'camera':
          return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        case 'microphone':
          return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        case 'accelerometer':
          return 'Accelerometer' in window;
        case 'gyroscope':
          return 'Gyroscope' in window;
        case 'webpayments':
          return 'PaymentRequest' in window;
        case 'pwa':
          return 'serviceWorker' in navigator;
        case 'wasm':
          return 'WebAssembly' in window;
        case 'workers':
          return 'Worker' in window;
        case 'websockets':
          return 'WebSocket' in window;
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  // Получаем информацию о производительности памяти
  let memoryInfo;
  try {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      memoryInfo = {
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        totalJSHeapSize: memory.totalJSHeapSize,
        usedJSHeapSize: memory.usedJSHeapSize,
      };
    }
  } catch (error) {
    console.warn('Performance Memory API не поддерживается');
  }

  // Проверяем медиа-предпочтения
  const mediaQueries = {
    prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches,
    prefersContrast: window.matchMedia('(prefers-contrast: more)').matches ? 'high' :
                     window.matchMedia('(prefers-contrast: less)').matches ? 'low' : 'no-preference',
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' :
                 window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'no-preference',
  } as const;

  const [
    webGPUSupport,
    bluetoothSupport,
    geolocationSupport,
    notificationsSupport,
    cameraSupport,
    microphoneSupport,
    accelerometerSupport,
    gyroscopeSupport,
    webPaymentsSupport,
    pwaSupport,
    wasmSupport,
    workersSupport,
    websocketsSupport,
  ] = await Promise.all([
    checkApiSupport('webgpu'),
    checkApiSupport('bluetooth'),
    checkApiSupport('geolocation'),
    checkApiSupport('notifications'),
    checkApiSupport('camera'),
    checkApiSupport('microphone'),
    checkApiSupport('accelerometer'),
    checkApiSupport('gyroscope'),
    checkApiSupport('webpayments'),
    checkApiSupport('pwa'),
    checkApiSupport('wasm'),
    checkApiSupport('workers'),
    checkApiSupport('websockets'),
  ]);

  // Получаем данные о посещениях
  const visitData = getVisitData();
  const isReturning = visitData.visitCount > 0;
  visitData.visitCount++;
  visitData.lastVisit = new Date();
  localStorage.setItem('visitData', JSON.stringify(visitData));

  // Определяем качество соединения
  const getConnectionQuality = (): 'poor' | 'medium' | 'good' | 'excellent' => {
    const connection = (navigator as any).connection;
    if (!connection) return 'medium';
    
    if (connection.effectiveType === '4g' && connection.downlink > 10) return 'excellent';
    if (connection.effectiveType === '4g') return 'good';
    if (connection.effectiveType === '3g') return 'medium';
    return 'poor';
  };

  const features = {
    touchScreen: 'ontouchstart' in window,
    webGL: !!document.createElement('canvas').getContext('webgl'),
    canvas: !!document.createElement('canvas').getContext('2d'),
    webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    webGPU: webGPUSupport,
    bluetooth: bluetoothSupport,
    geolocation: geolocationSupport,
    notifications: notificationsSupport,
    camera: cameraSupport,
    microphone: microphoneSupport,
    accelerometer: accelerometerSupport,
    gyroscope: gyroscopeSupport,
  };

  const userInfo: UserInfo = {
    browser: {
      name: browserResult.name || 'Unknown',
      version: browserResult.version || 'Unknown',
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      userAgent: navigator.userAgent,
      plugins,
      doNotTrack: navigator.doNotTrack === '1',
      maxTouchPoints: navigator.maxTouchPoints,
      pdfViewerEnabled: 'pdfViewerEnabled' in navigator,
    },
    system: {
      os: osResult.name || 'Unknown',
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      deviceType: deviceResult.type || 'desktop',
      deviceMemory: (navigator as any).deviceMemory,
      cpuCores: navigator.hardwareConcurrency,
      battery: batteryInfo,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      maxTextureSize,
    },
    network: {
      connectionType: (navigator as any).connection?.type,
      effectiveType: (navigator as any).connection?.effectiveType,
      downlink: (navigator as any).connection?.downlink,
      rtt: (navigator as any).connection?.rtt,
      saveData: (navigator as any).connection?.saveData,
      online: navigator.onLine,
    },
    location: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      languages: Array.from(navigator.languages),
      region: Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1],
    },
    performance: {
      navigationStart: performance.timing?.navigationStart,
      loadTime: performance.timing?.loadEventEnd - performance.timing?.navigationStart,
      domInteractive: performance.timing?.domInteractive - performance.timing?.navigationStart,
      domComplete: performance.timing?.domComplete - performance.timing?.navigationStart,
      memoryUsage: memoryInfo,
    },
    features,
    media: mediaQueries,
    marketing: {
      deviceCategory: getDeviceCategory(),
      browserCategory: getBrowserCategory(browserResult.name || '', browserResult.version || ''),
      platform: osResult.name?.toLowerCase().includes('windows') ? 'windows' :
                osResult.name?.toLowerCase().includes('mac') ? 'mac' :
                osResult.name?.toLowerCase().includes('linux') ? 'linux' :
                osResult.name?.toLowerCase().includes('ios') ? 'ios' :
                osResult.name?.toLowerCase().includes('android') ? 'android' : 'other',
      screenCategory: getScreenCategory(),
      performanceScore: calculatePerformanceScore(performance),
      engagement: {
        timeOnSite: 0, // Будет обновляться через интервал
        pageViews: 1, // Будет обновляться при навигации
        scrollDepth: 0, // Будет обновляться при скролле
        lastVisit: visitData.lastVisit ? new Date(visitData.lastVisit) : undefined,
        visitCount: visitData.visitCount,
        returningVisitor: isReturning,
      },
      capabilities: {
        supportsModernWeb: webGPUSupport || wasmSupport,
        supportsWebPayments: webPaymentsSupport,
        supportsProgressiveWebApps: pwaSupport,
        supportsWebAssembly: wasmSupport,
        supportsWebWorkers: workersSupport,
        supportsWebSockets: websocketsSupport,
      },
      preferences: {
        colorPreference: mediaQueries.colorScheme === 'no-preference' ? 'auto' : mediaQueries.colorScheme,
        fontScale: parseFloat(getComputedStyle(document.documentElement).fontSize) / 16,
        reducedMotion: mediaQueries.prefersReducedMotion,
        prefers3D: !mediaQueries.prefersReducedMotion && webGPUSupport,
        prefersMinimalUI: mediaQueries.prefersReducedData || mediaQueries.prefersReducedMotion,
      },
      userSegment: {
        deviceValue: batteryInfo && (navigator as any).deviceMemory > 4 && navigator.hardwareConcurrency > 4 ? 'high' :
                    batteryInfo && (navigator as any).deviceMemory > 2 ? 'medium' : 'low',
        connectionQuality: getConnectionQuality(),
        technicalProficiency: getTechnicalProficiency(features),
        accessibilityNeeds: [
          mediaQueries.prefersReducedMotion && 'reduced-motion',
          mediaQueries.prefersContrast === 'high' && 'high-contrast',
          mediaQueries.prefersReducedData && 'reduced-data',
        ].filter(Boolean) as string[],
      },
      session: {
        referrer: document.referrer,
        entryPage: window.location.pathname,
        landingTime: new Date(),
        ...getUtmParams(),
      },
      behavior: {
        mouseMovement: 0, // Будет обновляться через события
        keyboardInteraction: 0,
        touchInteraction: 0,
        formInteraction: 0,
        mediaInteraction: 0,
        copyPasteActions: 0,
      },
    },
  };

  return userInfo;
}; 