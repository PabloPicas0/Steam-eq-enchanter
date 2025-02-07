import { EquipmentModel } from "../models/EquipmentModel";

self.onmessage = (
  event: MessageEvent<{ nameFilter: string; qualityFilter: string; sortAscending: boolean, items: EquipmentModel }>
) => {
  const { nameFilter, qualityFilter, sortAscending, items } = event.data;

  const nameRegex = new RegExp(nameFilter, "gmi");
  const qualityRegex = new RegExp(`[${qualityFilter}]`);

  const filteredItems = items.assets
    .filter((item) => nameRegex.test(item.name))
    .filter((item) => qualityRegex.test(item.quality.toString()))
    .sort((a, b) => (sortAscending ? a.quality - b.quality : b.quality - a.quality));

    postMessage(filteredItems)
};
