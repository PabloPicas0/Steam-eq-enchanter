function saveToStorage(classid: string, targetPrice: number) {
  const prices = JSON.parse(localStorage.getItem("prices") || "{}") as { [key: string]: number };

  prices[classid] = targetPrice;

  localStorage.setItem("prices", JSON.stringify(prices));
}

export default saveToStorage