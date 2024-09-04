import { useState } from "react";

import { EquipmentModel } from "../models/EquipmentModel";

function useFiter(items: EquipmentModel) {
  const [regexFilter, setRegexFilter] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  const regex = new RegExp(regexFilter, "gmi");
  
  const filteredItems = items.assets
    .filter((item) => regex.test(item.name))
    .sort((a, b) => (sortAscending ? a.quality - b.quality : b.quality - a.quality));

  return { filteredItems, regexFilter, sortAscending, setRegexFilter, setSortAscending };
}

export default useFiter;
