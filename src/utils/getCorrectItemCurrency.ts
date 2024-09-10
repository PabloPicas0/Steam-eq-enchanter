import { ItemModel } from "../models/ItemsModel";

type CurrencyDataType =
  | {
      currency: string;
      code: string;
      mid: number;
    }
  | undefined;

function getCorrectItemCurrency(items: ItemModel[], currencyData: CurrencyDataType) {
  return items.map((item) => {
    const newItem = structuredClone(item);

    if (!newItem.market_price || !newItem.price_history || !currencyData) return item;

    const { mid, code } = currencyData;
    const marketPrice = parseFloat(newItem.market_price.replace(",", "."));
    const newPrices = newItem.price_history.prices.map((price) => {
      price[1] = price[1] / mid;

      return price;
    });

    newItem.market_price = (marketPrice / mid).toFixed(2);
    newItem.price_history.prices = newPrices;
    newItem.price_history.price_suffix = code;

    return newItem;
  });
}

export default getCorrectItemCurrency;
