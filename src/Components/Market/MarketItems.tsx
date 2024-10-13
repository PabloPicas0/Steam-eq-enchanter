import { useAppSelector } from "../../hooks/useAppSelector ";

function MarketItems() {
  const items = useAppSelector((state) => state.itemsFromMarket.marketItems);
  const pending = useAppSelector((state) => state.itemsFromMarket.pending);

  return (
    <>
      <h2>Items {items.length}/10</h2>
      <div className="items-from-market-wrapper">
        {items.map((item, idx) => {
          const { sell_price_text } = item.results[0];
          const { icon_url, classid, name } = item.results[0].asset_description;

          return (
            <div className="item-from-market" key={classid + idx}>
              <img
                src={`https://steamcommunity-a.akamaihd.net/economy/image//${icon_url}`}
                width={100}
                height={100}
              />

              <div>
                <p>{name + " " + idx}</p>
                <p>{sell_price_text}</p>
              </div>
            </div>
          );
        })}

        {pending && <div className="skeleton-rect" style={{ width: "auto", height: "auto" }} />}
      </div>
    </>
  );
}

export default MarketItems;
