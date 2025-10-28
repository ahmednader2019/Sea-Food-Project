import { useMediaQuery } from 'react-responsive';

/**
 * Custom hook for responsive design
 * Detects device type and screen size
 */
export function useResponsive() {
  // Device type detection
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Specific breakpoints
  const isSmallMobile = useMediaQuery({ maxWidth: 374 });
  const isMediumMobile = useMediaQuery({ minWidth: 375, maxWidth: 575 });
  const isLargeMobile = useMediaQuery({ minWidth: 576, maxWidth: 767 });

  // Orientation
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });

  // Touch device detection
  const isTouchDevice = useMediaQuery({ hover: 'none' });

  return {
    // Main breakpoints
    isMobile,
    isTablet,
    isDesktop,

    // Mobile sub-categories
    isSmallMobile,
    isMediumMobile,
    isLargeMobile,

    // Orientation
    isPortrait,
    isLandscape,

    // Touch capability
    isTouchDevice,

    // Combined checks
    isMobilePortrait: isMobile && isPortrait,
    isMobileLandscape: isMobile && isLandscape,
  };
}

/**
 * Get responsive values based on screen size
 * @example const fontSize = useResponsiveValue({ mobile: 14, tablet: 16, desktop: 18 })
 */
export function useResponsiveValue<T>(values: {
  mobile: T;
  tablet?: T;
  desktop?: T;
}): T {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile) return values.mobile;
  if (isTablet) return values.tablet ?? values.mobile;
  return values.desktop ?? values.tablet ?? values.mobile;
}
