import { useMemo } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import usePrice from "../../hooks/usePrice";
import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { removeMarketitem } from "../../Store/Slices/itemsFromMarketSlice";
import getSavedItemProps from "../../utils/getSavedItemProps";
import Area from "../Area";
import saveToStorage from "../../utils/saveToStorage";

// TODO: PriceHistory is always in PLN
function Item(props: { item: AdditionalItemModel }) {
  const { item } = props;

  const { sell_price_text, price_history } = item.results[0];
  const { icon_url, classid, name, name_color } = item.results[0].asset_description;

  const savedPrice = useMemo(() => getSavedItemProps(classid), []);
  const { targetPrice, sellProfit, buyProfit, setTargetPrice } = usePrice({
    savedPrice,
    market_price: sell_price_text,
  });

  function setNewPrice(e: number) {
    if (e < 0) {
      setTargetPrice(0.03);
    } else if (e > 999) {
      setTargetPrice(999);
    } else {
      setTargetPrice(e);
    }

    saveToStorage(classid, targetPrice);
  }

  const dispatch = useAppDispatch();

  return (
    <div className="item-from-market" style={{border: `1px solid #${name_color}`}}>
      <div onClick={() => dispatch(removeMarketitem(classid))}>
        <img
          src={`https://steamcommunity-a.akamaihd.net/economy/image//${icon_url}`}
          width={100}
          height={100}
        />

        <div>
          <p>{name}</p>
          <p>{sell_price_text}</p>
        </div>
      </div>

      {price_history ? (
        <Area width={800} height={600} data={price_history.prices} targetPrice={targetPrice} setNewPrice={setNewPrice} />
      ) : null}
    </div>
  );
}

export default Item;
