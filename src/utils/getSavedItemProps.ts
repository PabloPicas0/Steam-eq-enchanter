import { StoragePrices } from "../models/StoragePricesModel";

function getSavedItemProps(classid: string) {
  const storage = localStorage.getItem("prices");

  if (!storage) return 0.03;

  const prices: StoragePrices = JSON.parse(storage);
  const price = prices[classid];

  if (!price) return 0.03;

  return price.targetPrice;
}

export default getSavedItemProps;
