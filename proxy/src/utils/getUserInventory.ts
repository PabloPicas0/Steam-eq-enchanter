import { UserInventoryType } from "../models/UserInventoryModel.js";

async function getUserInventory(id: string) {
  const url = `http://steamcommunity.com/inventory/${id}/730/2?l=english&count=5000`;

  const inventory = await fetch(url);

  if (!inventory.ok) throw new Error("Unable to fetch equipment");

  const inventoryData: UserInventoryType = await inventory.json();

  const ids = inventoryData.assets.map((item) => item.classid);
  const itemsAmmount: { [key: string]: number } = ids.reduce((acc, id) => {
    acc[id] = acc[id] + 1 || 1;

    return acc;
  }, {});

  // Remove duplicates and add item ammount data
  const filteredIds = Array.from(new Set(ids));
  const filteredAssets = filteredIds.map((id) => {
    const item = inventoryData.assets.find((item) => item.classid === id);
    const classid = item.classid;

    item.amount = itemsAmmount[classid];

    return item;
  });

  inventoryData.assets = filteredAssets;
  inventoryData.total_inventory_count = filteredAssets.length;

  return inventoryData;
}

export default getUserInventory;
