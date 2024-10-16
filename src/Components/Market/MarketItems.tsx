import { useAppSelector } from "../../hooks/useAppSelector ";
import Item from "./Item";

function MarketItems() {
  const items = useAppSelector((state) => state.itemsFromMarket.marketItems);
  const pending = useAppSelector((state) => state.itemsFromMarket.pending);

  return (
    <>
      <h2 style={{ color: "white" }}>Items {items.length}/10</h2>

      <div className="items-from-market-wrapper">
        {items.map((item, idx) => {
          const { classid } = item.results[0].asset_description;

          return <Item item={item} key={classid + idx} />;
        })}

        {pending && <span className="loader"></span>}
      </div>
    </>
  );
}

export default MarketItems;
