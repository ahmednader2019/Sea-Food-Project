import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ResponsiveProps {
  children: ReactNode;
}

/**
 * Show content only on mobile devices
 */
export function Mobile({ children }: ResponsiveProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? <>{children}</> : null;
}

/**
 * Show content only on tablet devices
 */
export function Tablet({ children }: ResponsiveProps) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? <>{children}</> : null;
}

/**
 * Show content only on desktop devices
 */
export function Desktop({ children }: ResponsiveProps) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? <>{children}</> : null;
}

/**
 * Show content on mobile and tablet
 */
export function NotDesktop({ children }: ResponsiveProps) {
  const isNotDesktop = useMediaQuery({ maxWidth: 1023 });
  return isNotDesktop ? <>{children}</> : null;
}

/**
 * Show content on tablet and desktop
 */
export function NotMobile({ children }: ResponsiveProps) {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? <>{children}</> : null;
}

// Export all as named exports
export const Responsive = {
  Mobile,
  Tablet,
  Desktop,
  NotDesktop,
  NotMobile,
};

export default Responsive;
