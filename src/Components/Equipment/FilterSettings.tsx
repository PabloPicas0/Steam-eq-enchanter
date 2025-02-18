import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { EquipmentModel } from "../../models/EquipmentModel";
import { loadFilterItems } from "../../Store/Slices/profileSlice";

import Filter from "./Filter";
import Sort from "./Sort";
import Search from "./Search";

const workerURL = new URL("../../Workers/FilterWorker.ts", import.meta.url);

// TODO: Consider to add only weapons in Eq to filter
function FilterSettings(props: { items: EquipmentModel }) {
  const { items } = props;

  const [search, setSearch] = useState("");
  const [qualityFilter, setQualityFilter] = useState("12345678");
  const [sortAscending, setSortAscending] = useState(true);
  const [weaponFilter, setWeaponFilter] = useState<string[][]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize worker
    const newWorker = new Worker(workerURL);

    // Handle worker messages
    newWorker.onmessage = (event: MessageEvent<EquipmentModel["assets"]>) => {
      dispatch(loadFilterItems(event.data));
    };

    // Send computation to worker
    newWorker.postMessage({ search, qualityFilter, sortAscending, weaponFilter, items });

    // Cleanup the worker when component unmounts
    return () => {
      newWorker.terminate();
    };
  }, [search, qualityFilter, weaponFilter, sortAscending]);

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <Sort sortAscending={sortAscending} setSortAscending={setSortAscending} />
      <Filter
        qualityFilter={qualityFilter}
        weaponFilter={weaponFilter}
        setQualityFilter={setQualityFilter}
        setWeaponFilter={setWeaponFilter}
      />
    </>
  );
}

export default FilterSettings;
