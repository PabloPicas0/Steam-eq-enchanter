import { AdditionalItemModel } from "../models/AdditionalItemModel";
import { CurrencyModel } from "../models/CurrencyModel";

function getCorrectMarketCurrency(items: AdditionalItemModel[], currencyData?: CurrencyModel[0]) {
  return items.map((item) => {
    const newItem = structuredClone(item);

    if (!newItem.results[0].price_history || !currencyData) return item;

    const { mid, code } = currencyData;
    const newPriceHistory = newItem.results[0].price_history.prices.map((price) => {
      price[1] = price[1] / mid;

      return price;
    });

    newItem.results[0].price_history.prices = newPriceHistory;
    newItem.results[0].price_history.price_suffix = code;

    return newItem;
  });
}

export default getCorrectMarketCurrency