import { UserInvenotryType } from "../models/UserInventoryModel.js";

async function getUserInventory(id: string) {
  const inventory = await fetch(`http://steamcommunity.com/inventory/${id}/730/2?l=english&count=5000`);

  if (!inventory.ok) throw new Error("Unable to fetch equipment");

  const inventoryData: UserInvenotryType = await inventory.json();


  // Remove duplicates
  const ids = inventoryData.assets.map((item) => item.classid);
  const filteredAssets = inventoryData.assets.filter((item, idx) => !ids.includes(item.classid, idx + 1));

  inventoryData.assets = filteredAssets;
  inventoryData.total_inventory_count = filteredAssets.length;

  return inventoryData;
}

export default getUserInventory;
