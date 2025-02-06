import { useMemo } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector ";
import { loadMarketData } from "../../Store/Thunks/loadMarketDataThunk";
import { CurrencyTableModel } from "../../models/CurrencyModel";

import getCorrectItemCurrency from "../../utils/getCorrectItemCurrency";
import UserItem from "./UserItem";
import PickedItem from "./PickedItem";

type PropTypes = {
  currencyCode: string;
  pickedCurrencyData: CurrencyTableModel[0]["rates"][0] | undefined;
};

function PickedItems(props: PropTypes) {
  const { currencyCode, pickedCurrencyData } = props;

  const pickedItems = useAppSelector((state) => state.profile.pickedItems);
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
