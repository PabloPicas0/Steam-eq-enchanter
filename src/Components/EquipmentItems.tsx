import usePagination from "../hooks/usePagination";
import { EquipmentModel } from "../models/EquipmentModel";
import { ItemModel } from "../models/ItemsModel";
import UserItem from "./UserItem";

type PropTypes = {
  filteredItems: EquipmentModel["assets"];
  setPickedItems: React.Dispatch<React.SetStateAction<ItemModel[]>>;
}

function EquipmentItems(props: PropTypes) {
  const { filteredItems, setPickedItems } = props;

  const { pagination, setPagination, moveBackwards, moveForeword } = usePagination(filteredItems.length);
  const { start, end } = pagination;

  return (
    <>
      <ul className="items-container">
        {filteredItems.slice(start, end).map((item) => {
          return (
            <UserItem key={item.market_name} item={item} setPickedItems={setPickedItems} isSelected={false} />
          );
        })}
      </ul>

      <div className="pagination">
        <button onClick={() => setPagination(moveBackwards)}>Back</button>

        {`${start} / ${end} of ${filteredItems.length}`}

        <button onClick={() => setPagination(moveForeword)}>Next</button>
      </div>
    </>
  );
}

export default EquipmentItems;
