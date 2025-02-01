import { useRef } from "react";
import { EquipmentModel } from "../../models/EquipmentModel";
import UserItem from "./UserItem";
import UserItemList from "./UserItemList";
import Pagination from "../Pagination";

type PropTypes = {
  filteredItems: EquipmentModel["assets"];
};

// TODO: Pagination not showing current card
function Items(props: PropTypes) {
  const { filteredItems } = props;

  const carouselRef = useRef<HTMLDivElement>(null);
  const listCount = Math.ceil(filteredItems.length / 24);
  const lists = Array.from({ length: listCount }, (_, i) => i + 1);

  const goToPrevious = () => {
    if (carouselRef.current) carouselRef.current.scrollLeft += -carouselRef.current.offsetWidth;
  };

  const goToNext = () => {
    if (carouselRef.current) carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  return (
    <>
      <div ref={carouselRef} className="carousel-wrapper">
        {lists.map((list) => {
          const end = 24 * list;
          const start = end - 24; // TODO: Missed by one

          return (
            <UserItemList key={"carousel " + list} carouselRef={carouselRef}>
              {filteredItems.slice(start, end).map((item) => (
                <UserItem key={item.market_name} item={item} isSelected={false} />
              ))}
            </UserItemList>
          );
        })}
      </div>

      <Pagination lastPage={listCount} nextPage={goToNext} previousPage={goToPrevious} />
    </>
  );
}

export default Items;
