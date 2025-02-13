import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector ";
import { loadMarketData } from "../../Store/Thunks/loadMarketDataThunk";
import { CurrencyTableModel } from "../../models/CurrencyModel";
import { ItemModel } from "../../models/ItemsModel";

import PickedItem from "./PickedItem";
import useWebWorker from "../../hooks/useWebWorker";

const workerScript = new URL("../../Workers/correctCurrencyWorker.ts", import.meta.url);

function PickedItems() {
  const pickedItems = useAppSelector((state) => state.profile.pickedItems);
  const currencyCode = useAppSelector((state) => state.profile.currencyCode);
  const currencies = useAppSelector((state) => state.profile.currencies);

  const pickedCurrencyData = currencies[0].rates.find((rate) => rate.code === currencyCode);
  const { result, newTask } = useWebWorker<
    [ItemModel[], CurrencyTableModel[0]["rates"][0] | undefined],
    ItemModel[]
  >(workerScript, []);

  useEffect(() => newTask([pickedItems, pickedCurrencyData]), [pickedItems, currencyCode]);

  const dispatch = useAppDispatch();

  function getMarketData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    dispatch(loadMarketData());
  }

  return (
    <div>
      <h2>Selected items: {result.length}/10</h2>

      {result.length ? (
        <>
          <ul className="items-container selected-items-container">
            {result.map((item) => (
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
