import { EquipmentModel } from "../models/EquipmentModel";

type MessageEventData = {
  search: string;
  qualityFilter: string;
  sortAscending: boolean;
  weaponFilter: string[];
  items: EquipmentModel;
};

self.onmessage = (event: MessageEvent<MessageEventData>) => {
  const { search, qualityFilter, sortAscending, weaponFilter, items } = event.data;

  const nameRegex = new RegExp(search, "gmi");
  const qualityRegex = new RegExp(`[${qualityFilter}]`);
  const weaponRegex = new RegExp(weaponFilter.join("|"));

  const filteredItems = items.assets
    .filter((item) => nameRegex.test(item.name))
    .filter((item) => qualityRegex.test(item.quality.toString()))
    .filter((item) => weaponRegex.test(item.name) && !item.name.includes("Case"))
    .sort((a, b) => (sortAscending ? a.quality - b.quality : b.quality - a.quality));

  postMessage(filteredItems);
};
