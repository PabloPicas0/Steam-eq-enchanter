import { EquipmentModel } from "../models/EquipmentModel";

type MessageEventData = {
  search: string;
  qualityFilter: string;
  sortAscending: boolean;
  weaponFilter: string[][];
  items: EquipmentModel;
};

type ItemType = MessageEventData["items"]["assets"][0];

self.onmessage = (event: MessageEvent<MessageEventData>) => {
  const { search, qualityFilter, sortAscending, weaponFilter, items } = event.data;

  const weaponTypes = weaponFilter.map((weapon) => weapon[1]).join("|");
  const weaponNames = weaponFilter.map((weapon) => weapon[0]).join("|");

  const filters = {
    name: (item: ItemType) => new RegExp(search, "gmi").test(item.name),
    quality: (item: ItemType) => new RegExp(`[${qualityFilter}]`).test(item.quality.toString()),
    weapon: (item: ItemType) => new RegExp(weaponNames).test(item.name),
    weaponType: (item: ItemType) => new RegExp(weaponTypes).test(item.type),
  };
  const filtersFn = Object.values(filters);

  const filteredItems = items.assets
    .filter((item) => filtersFn.every((fn) => fn(item)))
    .sort((a, b) => (sortAscending ? a.quality - b.quality : b.quality - a.quality));

  postMessage(filteredItems);
};
