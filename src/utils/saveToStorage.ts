type Prices = {
  [key: string]:
    | {
        targetPrice: number;
        created: number;
        lastModified: number;
      }
    | undefined;
};

function saveToStorage(classid: string, targetPrice: number) {
  const current = new Date().getTime();
  const prices: Prices = JSON.parse(localStorage.getItem("prices") || "{}");

  if (!prices[classid])
    prices[classid] = { targetPrice: targetPrice, created: current, lastModified: current };

  prices[classid].targetPrice = targetPrice;
  prices[classid].lastModified = current;

  localStorage.setItem("prices", JSON.stringify(prices));
}

export default saveToStorage;
