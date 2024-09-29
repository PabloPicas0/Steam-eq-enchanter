import { useAppDispatch } from "../hooks/useAppDispatch";
import { ItemModel } from "../models/ItemsModel";
import { loadMarketData } from "../Store/Slices/profileSlice";
import UserItem from "./UserItem";

type PropTypes = {
  itemsWithCorrecetedCurrency: ItemModel[];
};

function EquipmentPickedItems(props: PropTypes) {
  const { itemsWithCorrecetedCurrency } = props;

  const dispatch = useAppDispatch();

  function getMarketData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    dispatch(loadMarketData());
  }

  return (
    <div>
      <h2>Selected items: {itemsWithCorrecetedCurrency.length}/10</h2>

      {itemsWithCorrecetedCurrency.length ? (
        <>
          <ul className="items-container selected-items-container">
            {itemsWithCorrecetedCurrency.map((item) => {
              return <UserItem key={item.classid} item={item} isSelected={true} />;
            })}
          </ul>

          <form method="POST">
            <button type="submit" onClick={getMarketData}>
              Get Market Data
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}

export default EquipmentPickedItems;
