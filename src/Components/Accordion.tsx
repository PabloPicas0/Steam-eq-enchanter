import { ReactNode, useState } from "react";

function Accordion(props: { children: ReactNode, title: string }) {
  const { children, title } = props;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsClicked((prev) => !prev)}
        style={{ display: "flex", justifyContent: "space-between", userSelect: "none" }}>
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

      <div style={{ maxHeight: isClicked ? 400 : 0, overflow: "hidden", transition: "all 250ms" }}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;
