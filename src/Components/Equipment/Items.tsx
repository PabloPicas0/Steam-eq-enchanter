import usePagination from "../../hooks/usePagination";
import { EquipmentModel } from "../../models/EquipmentModel";
import UserItem from "./UserItem";

type PropTypes = {
  filteredItems: EquipmentModel["assets"];
};

function Items(props: PropTypes) {
  const { filteredItems } = props;

  const { pagination, setPagination, moveBackwards, moveForeword } = usePagination(filteredItems.length);
  const { start, end } = pagination;

  return (
    <>
      <ul className="items-container">
        {filteredItems.map((item) => (
          <UserItem key={item.market_name} item={item} isSelected={false} />
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setPagination(moveBackwards)}>Back</button>

        {`${start} / ${end} of ${filteredItems.length}`}

        <button onClick={() => setPagination(moveForeword)}>Next</button>
      </div>
    </>
  );
}

export default Items;
