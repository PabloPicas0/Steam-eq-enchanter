import { useEffect } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector ";
import { loadFilterItems, newCurrencyCode } from "../../Store/Slices/profileSlice";

import useFiter from "../../hooks/useFilter";

import { EquipmentModel } from "../../models/EquipmentModel";

import FilterFavourite from "./FilterFavourite";
import FilterQuality from "./FilterQuality";
import ItemsCounter from "../ItemsCounter";

const workerURL = new URL("../../Workers/FilterWorker.ts", import.meta.url);

function FilterSettings(props: { items: EquipmentModel; currenciesCodes: string[] }) {
  const { items, currenciesCodes } = props;

  const { nameFilter, sortAscending, qualityFilter, setNameFilter, setSortAscending, setQualityFilter } =
    useFiter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize worker
    const newWorker = new Worker(workerURL);

    // Handle worker messages
    newWorker.onmessage = (event: MessageEvent<EquipmentModel["assets"]>) => {
      dispatch(loadFilterItems(event.data));
    };

    // Send computation to worker
    newWorker.postMessage({ nameFilter, qualityFilter, sortAscending, items });

    // Cleanup the worker when component unmounts
    return () => {
      newWorker.terminate();
    };
  }, [nameFilter, qualityFilter, sortAscending]);

  const currencyCode = useAppSelector((state) => state.profile.currencyCode);

  return (
    <div>
      <ItemsCounter />

      <div className="inputs-wrapper">
        <input
          className="input-steamID input-filter-equipment"
          type="text"
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value.replace("\\", ""));
          }}
          placeholder="Search"
        />

        <button
          title={`Sorted ${sortAscending ? "ascending" : " descending"}`}
          className="sort-btn"
          onClick={() => setSortAscending((prev) => !prev)}>
          Sort {sortAscending ? "\u2191" : "\u2193"}
        </button>

        <FilterQuality qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} />
        <FilterFavourite items={items} />

        <select
          value={currencyCode}
          onChange={(e) => dispatch(newCurrencyCode(e.target.value))}
          className="currency-select">
          <option value={"PLN"}>PLN</option>
          {currenciesCodes.map((currCode) => {
            return (
              <option key={currCode} value={currCode}>
                {currCode}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default FilterSettings;
