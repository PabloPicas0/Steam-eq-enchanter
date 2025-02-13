import FavouriteItems from "./FavouriteItems";
import ItemsCounter from "../ItemsCounter";
import ItemsCurrency from "./ItemsCurrency";
import FilterSettings from "./FilterSettings";

import { useAppSelector } from "../../hooks/useAppSelector ";

function ItemsSettings() {
  const items = useAppSelector((state) => state.profile.items[1]);
  const currencies = useAppSelector((state) => state.profile.currencies);
  const currenciesCodes = currencies[0].rates.map((rate) => rate.code);

  return (
    <div>
      <ItemsCounter />

      <div className="inputs-wrapper">
        <FilterSettings items={items} />
        <FavouriteItems items={items} />
        <ItemsCurrency currenciesCodes={currenciesCodes} />
      </div>
    </div>
  );
}

export default ItemsSettings;
