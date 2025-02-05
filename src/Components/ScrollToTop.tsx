import { useEffect, useState } from "react";
import GoToTopIcon from "../Icons/GoToTop.svg";
import "../styles/ScrollToTop.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const visibilityState = isVisible ? "visible" : "hidden";
  const opacityState = isVisible ? 1 : 0;
  const scrollToTop = () => document.body.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const body = document.body;
    const isScrolled = () => (body.scrollTop > 300 ? setIsVisible(true) : setIsVisible(false));

    body.addEventListener("scroll", isScrolled);

    return () => body.removeEventListener("scroll", isScrolled);
  }, []);

  return (
    <div
      className="scroll-wrapper scroll-transition"
      style={{ visibility: visibilityState, opacity: opacityState }}
      onClick={scrollToTop}>
      <img src={GoToTopIcon}  />
    </div>
  );
}

export default ScrollToTop;
