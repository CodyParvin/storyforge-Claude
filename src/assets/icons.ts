
// Icon configurations and constants
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const ICON_COLORS = {
  primary: '#4f46e5',
  secondary: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Common icon props
export const defaultIconProps = {
  size: ICON_SIZES.md,
  color: ICON_COLORS.primary,
  strokeWidth: 2,
};
