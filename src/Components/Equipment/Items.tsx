import { EquipmentModel } from "../../models/EquipmentModel";
import UserItem from "./UserItem";

type PropTypes = {
  filteredItems: EquipmentModel["assets"];
};

function Items(props: PropTypes) {
  const { filteredItems } = props;

  return (
    <>
      <ul className="items-container">
        {filteredItems.map((item) => (
          <UserItem key={item.market_name} item={item} isSelected={false} />
        ))}
      </ul>
    </>
  );
}

export default Items;
