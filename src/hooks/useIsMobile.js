import { useEffect, useState } from "react";

export const MOBILE_QUERY = "(max-width: 768px)";

// True at phone width. Reads the media query during the first render, not in
// an effect: a first render with `false` would already request the lazy 3D
// chunks on a phone before the effect could correct it.
export const useIsMobile = (query = MOBILE_QUERY) => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return isMobile;
};
