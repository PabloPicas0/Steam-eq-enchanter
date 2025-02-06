import { ReactNode, useRef } from "react";
import { EquipmentModel } from "../../models/EquipmentModel";
import UserItem from "./UserItem";
import UserItemList from "./UserItemList";
import Pagination from "../Pagination";

type PropTypes = {
  filteredItems: EquipmentModel["assets"];
};

function Carousel(props: { ref: React.RefObject<HTMLDivElement | null>; children: ReactNode }) {
  const { children, ref } = props;

  return (
    <div ref={ref} className="carousel-wrapper">
      {children}
    </div>
  );
}

function Items(props: PropTypes) {
  const { filteredItems } = props;

  const carouselRef = useRef<HTMLDivElement>(null);
  const listCount = Math.ceil(filteredItems.length / 24);
  const lists = Array.from({ length: listCount }, (_, i) => i + 1);

  return (
    <>
      <Carousel ref={carouselRef}>
        {lists.map((list) => {
          const end = 24 * list;
          const start = end - 24; // TODO: Missed by one

          return (
            <UserItemList key={"carousel " + list} carouselRef={carouselRef}>
              {filteredItems.slice(start, end).map((item) => (
                <li className="item" style={{ borderColor: `#${item.color}` }}>
                  <UserItem key={item.market_name} item={item} isSelected={false} />
                </li>
              ))}
            </UserItemList>
          );
        })}
      </Carousel>

      <Pagination parentRef={carouselRef} lastPage={listCount} />
    </>
  );
}

export default Items;
