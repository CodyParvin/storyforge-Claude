
import { getConfig, isDevelopment } from '../config/deployment';

/**
 * Deployment utility functions for environment management
 * and configuration handling across different environments.
 */
export const deploymentUtils = {
  /**
   * Get current environment configuration
   * @returns Current environment config object
   */
  getEnvironmentConfig: () => getConfig(),
  
  /**
   * Check if running in production environment
   * @returns True if in production mode
   */
  isProductionBuild: () => process.env.NODE_ENV === 'production',
  
  /**
   * Check if running in development environment
   * @returns True if in development mode
   */
  isDevelopmentBuild: () => isDevelopment(),
  
  /**
   * Get application version from environment variables
   * @returns App version string
   */
  getAppVersion: () => {
    return import.meta.env.VITE_APP_VERSION || '1.0.0';
  },
  
  /**
   * Log environment information in development mode only
   * Useful for debugging configuration issues
   */
  logEnvironmentInfo: () => {
    if (!isDevelopment()) return;
    
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
  },
  
  /**
   * Check if a specific feature is enabled in current environment
   * @param feature Feature name to check
   * @returns True if feature is enabled
   */
  isFeatureEnabled: (feature: 'analytics' | 'errorReporting') => {
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
  
  /**
   * Get API endpoint URL with optional path
   * @param path Optional path to append to API URL
   * @returns Full API endpoint URL
   */
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
