import { ReactNode, useRef } from "react";
import useIsVisible from "../../hooks/useIsVisible";

function UserItemList(props: { children: ReactNode; carouselRef: React.RefObject<HTMLDivElement | null> }) {
  const { children, carouselRef } = props;

  const ref = useRef(null);
  const isVisible = useIsVisible(ref, carouselRef);

  return (
    <ul ref={ref} className="items-container">
      {isVisible ? children : null}
    </ul>
  );
}

export default UserItemList;
