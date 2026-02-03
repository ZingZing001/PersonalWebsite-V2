import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that handles scroll restoration on route changes.
 * This ensures users always start at the top of the page when navigating.
 * 
 * Usage: Place this component inside BrowserRouter in App.jsx
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Use "instant" for immediate scroll, "smooth" for animated
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};
