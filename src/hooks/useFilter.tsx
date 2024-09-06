import { useState } from "react";

import { EquipmentModel } from "../models/EquipmentModel";

function useFiter(items: EquipmentModel) {
  const [nameFilter, setNameFilter] = useState("");
  const [qualityFilter, setQualityFilter] = useState("12345678");
  const [sortAscending, setSortAscending] = useState(true);

  const nameRegex = new RegExp(nameFilter, "gmi");
  const qualityRegex = new RegExp(`[${qualityFilter}]`);

  const filteredItems = items.assets
    .filter((item) => nameRegex.test(item.name))
    .filter((item) => qualityRegex.test(item.quality.toString()))
    .sort((a, b) => (sortAscending ? a.quality - b.quality : b.quality - a.quality));

  return {
    filteredItems,
    nameFilter,
    sortAscending,
    qualityFilter,
    setNameFilter,
    setSortAscending,
    setQualityFilter,
  };
}

export default useFiter;
