import { useMemo } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector ";
import { loadMarketData } from "../../Store/Thunks/loadMarketDataThunk";
import { CurrencyTableModel } from "../../models/CurrencyModel";

import getCorrectItemCurrency from "../../utils/getCorrectItemCurrency";
import PickedItem from "./PickedItem";

type PropTypes = {
  currencies: CurrencyTableModel[0];
};

function PickedItems(props: PropTypes) {
  const { currencies } = props;

  const pickedItems = useAppSelector((state) => state.profile.pickedItems);
  const currencyCode = useAppSelector((state) => state.profile.currencyCode);

  const pickedCurrencyData = currencies.rates.find((rate) => rate.code === currencyCode);
  
  const itemsWithCorrecetedCurrency = useMemo(
    () => getCorrectItemCurrency(pickedItems, pickedCurrencyData),
    [pickedItems, currencyCode]
  );

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
            {itemsWithCorrecetedCurrency.map((item) => (
              <PickedItem key={item.classid} item={item} />
            ))}
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

export default PickedItems;
