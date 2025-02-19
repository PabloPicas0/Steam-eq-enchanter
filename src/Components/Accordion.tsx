import { ReactNode, useState } from "react";

function Accordion(props: { children: ReactNode; title: string }) {
  const { children, title } = props;
  const [isClicked, setIsClicked] = useState(false);

  const maxHeight = isClicked ? 400 : 0;
  const marginTop = isClicked ? "0.5rem" : 0;

  return (
    <div className="accordion">
      <div onClick={() => setIsClicked((prev) => !prev)} className="accordion-title">
        <span>{title}</span>
        <svg
          className="carret"
          style={{ transform: isClicked ? "rotate(180deg)" : "rotate(0deg)" }}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ExpandMoreIcon">
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </div>

      <div style={{ maxHeight: maxHeight, marginTop: marginTop }} className="accordion-content">
        {children}
      </div>
    </div>
  );
}

export default Accordion;
