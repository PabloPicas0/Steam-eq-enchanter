import { useAppSelector } from "../../hooks/useAppSelector ";
import { CurrencyTableModel } from "../../models/CurrencyModel";

import FilterSettings from "./FilterSettings";
import Items from "./Items";

type PropTypes = {
  currencies: CurrencyTableModel[0];
};

function NotPickedItems(props: PropTypes) {
  const { currencies } = props;

  const items = useAppSelector((state) => state.profile.items[1]);
  const currenciesCodes = currencies.rates.map((rate) => rate.code);

  return (
    <>
      <FilterSettings currenciesCodes={currenciesCodes} items={items} />
      <Items />
    </>
  );
}

export default NotPickedItems;
