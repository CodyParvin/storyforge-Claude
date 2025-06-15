
import { getConfig, isProduction, isDevelopment } from '../config/deployment';

export const deploymentUtils = {
  // Get current environment configuration
  getEnvironmentConfig: () => getConfig(),
  
  // Check if running in production
  isProductionBuild: () => isProduction(),
  
  // Check if running in development
  isDevelopmentBuild: () => isDevelopment(),
  
  // Get app version from package.json
  getAppVersion: () => {
    return import.meta.env.VITE_APP_VERSION || '1.0.0';
  },
  
  // Log environment info (development only)
  logEnvironmentInfo: () => {
    if (isDevelopment()) {
      const config = getConfig();
      console.log('🚀 AI StoryForge Environment Info:', {
        environment: import.meta.env.MODE,
        apiUrl: config.apiUrl,
        appUrl: config.appUrl,
        version: deploymentUtils.getAppVersion(),
        features: {
          analytics: config.enableAnalytics,
          errorReporting: config.enableErrorReporting,
        }
      });
    }
  },
  
  // Check if feature is enabled
  isFeatureEnabled: (feature: string) => {
    const config = getConfig();
    switch (feature) {
      case 'analytics':
        return config.enableAnalytics;
      case 'errorReporting':
        return config.enableErrorReporting;
      default:
        return false;
    }
  },
  
  // Get API endpoint with fallback
  getApiEndpoint: (path: string = '') => {
    const config = getConfig();
    const baseUrl = config.apiUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  }
};

// Initialize environment logging in development
if (isDevelopment()) {
  deploymentUtils.logEnvironmentInfo();
}
