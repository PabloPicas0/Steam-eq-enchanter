import { StoragePrices } from "../models/StoragePricesModel";

function saveToStorage(classid: string, targetPrice: number) {
  const current = new Date().getTime();
  const prices: StoragePrices = JSON.parse(localStorage.getItem("prices") || "{}");

  if (!prices[classid]) {
    const pricesKeys = Object.keys(prices)

    // If there is more than 50 prices
    // Delete oldest one
    if (pricesKeys.length >= 50) {
      let oldestLastModification = Number.POSITIVE_INFINITY
      let oldestKey = "";

      for (const key of pricesKeys) {
        const currentLastModification = prices[key].lastModified
        
        // Lower the number means more in past 
        if (currentLastModification < oldestLastModification) {
          oldestLastModification = currentLastModification;
          oldestKey = key;
        }
      }

      delete prices[oldestKey]
    }

    prices[classid] = { targetPrice: targetPrice, created: current, lastModified: current };
  }
    

  prices[classid].targetPrice = targetPrice;
  prices[classid].lastModified = current;

  localStorage.setItem("prices", JSON.stringify(prices));
}

export default saveToStorage;
