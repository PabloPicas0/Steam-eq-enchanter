import { ItemModel } from "../models/ItemsModel";
import { MarketModel } from "../models/MarketModel";
import UserItem from "./UserItem";

type PropTypes = {
  pickedItems: ItemModel[];
  setPickedItems: React.Dispatch<React.SetStateAction<ItemModel[]>>;
  itemsWithCorrecetedCurrency: ItemModel[];
};

function EquipmentPickedItems(props: PropTypes) {
  const { pickedItems, itemsWithCorrecetedCurrency, setPickedItems } = props;

  async function getMarketData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setPickedItems((prev) => {
      return prev.map((item) => {
        item.market_price = null;
        item.volume = null;
        item.price_history = null;

        return item;
      });
    });

    const itemsMarketName = pickedItems.map((item) => item.market_name);
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemsMarketName),
    });
    const data = (await response.json()) as MarketModel[];

    setPickedItems((prev) => {
      return prev.map((item, idx) => {
        const isSuccess = data[idx]?.success;

        item.market_price = isSuccess ? data[idx].lowest_price : "Not marketable";
        item.volume = isSuccess ? data[idx].volume : "Not marketable";
        item.price_history = data[idx].price_history.success ? data[idx].price_history : undefined;

        return item;
      });
    });
  }

  return (
    <div>
      <h2>Selected items: {pickedItems.length}/10</h2>

      {pickedItems.length ? (
        <>
          <ul className="items-container selected-items-container">
            {itemsWithCorrecetedCurrency.map((item) => {
              return (
                <UserItem key={item.classid} item={item} setPickedItems={setPickedItems} isSelected={true} />
              );
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
