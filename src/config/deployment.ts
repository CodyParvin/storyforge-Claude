
export const deploymentConfig = {
  // Production build settings
  production: {
    apiUrl: process.env.VITE_API_URL || 'https://api.your-domain.com',
    appUrl: process.env.VITE_APP_URL || 'https://your-domain.com',
    enableAnalytics: process.env.VITE_ENABLE_ANALYTICS === 'true',
    enableErrorReporting: process.env.VITE_ENABLE_ERROR_REPORTING === 'true',
    logLevel: process.env.VITE_LOG_LEVEL || 'error',
  },
  
  // Staging/preview settings
  staging: {
    apiUrl: process.env.VITE_API_URL || 'https://staging-api.your-domain.com',
    appUrl: process.env.VITE_APP_URL || 'https://staging.your-domain.com',
    enableAnalytics: false,
    enableErrorReporting: true,
    logLevel: process.env.VITE_LOG_LEVEL || 'warn',
  },
  
  // Development settings
  development: {
    apiUrl: process.env.VITE_API_URL || 'http://localhost:3001',
    appUrl: process.env.VITE_APP_URL || 'http://localhost:8080',
    enableAnalytics: false,
    enableErrorReporting: false,
    logLevel: process.env.VITE_LOG_LEVEL || 'debug',
  }
};

export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return deploymentConfig[env as keyof typeof deploymentConfig] || deploymentConfig.development;
};

export const isProduction = () => process.env.NODE_ENV === 'production';
export const isStaging = () => process.env.VITE_ENVIRONMENT === 'staging';
export const isDevelopment = () => process.env.NODE_ENV === 'development';
