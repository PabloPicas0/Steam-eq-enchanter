import { CurrencyTableModel } from "../models/CurrencyModel";
import { ItemModel } from "../models/ItemsModel";

self.onmessage = (event: MessageEvent<[ItemModel[], CurrencyTableModel[0]["rates"][0] | undefined]>) => {
  const [items, currencyData] = event.data;

  const newItems = items.map((item) => {
    if (!item.market_price || !item.price_history || !currencyData) return item;

    const { mid, code } = currencyData;
    const marketPrice = parseFloat(item.market_price.replace(",", "."));
    const newPrices = item.price_history.prices.map((price) => {
      price[1] = price[1] / mid;

      return price;
    });

    item.market_price = (marketPrice / mid).toFixed(2);
    item.price_history.prices = newPrices;
    item.price_history.price_suffix = code;

    return item;
  });

  postMessage(newItems)
};
