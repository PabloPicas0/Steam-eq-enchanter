import { CurrencyModel } from "../models/CurrencyModel.js";

async function getCurrency(currency: string) {
  const currencyRequest = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`, {
    headers: { Accept: "application/json" },
  });
  const response: CurrencyModel = await currencyRequest.json();

  return response.rates[0].mid
}

export default getCurrency;
