import { useMemo } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector ";
import { loadMarketData } from "../Store/Slices/profileSlice";
import { CurrencyTableModel } from "../models/CurrencyModel";

import getCorrectItemCurrency from "../utils/getCorrectItemCurrency";
import UserItem from "./UserItem";

type PropTypes = {
  currencyCode: string;
  pickedCurrencyData: CurrencyTableModel[0]["rates"][0] | undefined;
};

function EquipmentPickedItems(props: PropTypes) {
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
