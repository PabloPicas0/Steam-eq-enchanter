import { useState, useEffect } from "react";

const useIsVisible = (
  elementRef: React.RefObject<null | HTMLElement>,
  root: React.RefObject<HTMLDivElement | null>
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          });
        },
        { root: root.current, rootMargin: "0px 100%" }
      );

      observer.observe(elementRef.current);

      return () => {
        if (elementRef.current) observer.unobserve(elementRef.current);
      };
    }
  }, [elementRef]);

  return isVisible;
};

export default useIsVisible;
