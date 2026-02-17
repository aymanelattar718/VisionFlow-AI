/**
 * VisionFlow AI - Application Configuration
 * Central configuration file for the application
 */

export const appConfig = {
  name: 'VisionFlow AI',
  tagline: 'AI Video Generator',
  description: 'Create stunning AI-generated videos from text prompts',
  version: '1.0.0',

  // Logo configuration
  logo: {
    url: '/logo.svg',
    alt: 'VisionFlow AI Logo',
    size: {
      home: 180, // Home page logo size in px
      header: 50, // Header logo size in px
    },
  },

  // Theme colors (blue gradient theme)
  theme: {
    primary: {
      from: '#1e40af',
      to: '#3b82f6',
    },
    secondary: {
      from: '#0ea5e9',
      to: '#22d3ee',
    },
    accent: '#06b6d4',
  },

  // Social media links (dynamic and editable)
  socialLinks: {
    youtube: {
      url: 'https://youtube.com/@visionflowai',
      icon: 'youtube',
      label: 'YouTube',
      enabled: false, // Temporarily disabled
    },
    tiktok: {
      url: 'https://tiktok.com/@visionflowai',
      icon: 'tiktok',
      label: 'TikTok',
      enabled: false, // Temporarily disabled
    },
    instagram: {
      url: 'https://www.instagram.com/momentmedia.ig?igsh=N2Z1bzhuancyZXpt&utm_source=qr',
      icon: 'instagram',
      label: 'Instagram',
      enabled: true, // Official link provided
    },
    facebook: {
      url: 'https://www.facebook.com/share/182X7qgSvD/?mibextid=wwXIfr',
      icon: 'facebook',
      label: 'Facebook',
      enabled: true, // Official link provided
    },
    telegram: {
      url: 'https://t.me/visionflowai',
      icon: 'telegram',
      label: 'Telegram',
      enabled: false, // Temporarily disabled
    },
  },

  // Supported languages
  languages: {
    ar: {
      name: 'العربية',
      dir: 'rtl',
      flag: '🇸🇦',
    },
    en: {
      name: 'English',
      dir: 'ltr',
      flag: '🇺🇸',
    },
  },

  // Default language
  defaultLanguage: 'ar',

  // Video generation options
  videoOptions: {
    sceneStyles: ['realistic', 'cinematic', 'artistic', 'animated'],
    lightingOptions: ['natural', 'dramatic', 'soft', 'neon'],
    aspectRatios: [
      { value: '9:16', label: '9:16 (Portrait)' },
      { value: '16:9', label: '16:9 (Landscape)' },
      { value: '1:1', label: '1:1 (Square)' },
    ],
  },

  // API configuration
  api: {
    timeout: 120000, // 2 minutes
    maxRetries: 3,
    retryDelay: 2000, // 2 seconds
  },
} as const;

export type AppConfig = typeof appConfig;
