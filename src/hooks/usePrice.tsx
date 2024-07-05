import { useState } from "react";

type PropTypes = {
  savedPrice: number;
  market_price: string | null | undefined;
};

type UsePriceProperties = {
  targetPrice: number;
  sellProfit: null | string;
  priceOnMarketShouldBe: null | string;
  setTargetPrice: React.Dispatch<React.SetStateAction<number>>;
};

function usePrice(props: PropTypes): UsePriceProperties {
  const { savedPrice, market_price } = props;

  const [targetPrice, setTargetPrice] = useState(savedPrice);

  if (!market_price)
    return {
      targetPrice,
      priceOnMarketShouldBe: null,
      sellProfit: null,
      setTargetPrice,
    };

  const marketPrice = parseFloat(market_price?.replace("$", ""));

  const tax = Math.max(0.01, targetPrice * 0.15);
  const priceOnMarketShouldBe = targetPrice + tax;
  const makretPriceDifference = (marketPrice - priceOnMarketShouldBe).toFixed(2);
  const iGetFromCurrentMarketPrice = parseFloat((marketPrice * 0.8696).toFixed(2));

  const sellProfit = (iGetFromCurrentMarketPrice - targetPrice).toFixed(2);

  return {
    targetPrice,
    priceOnMarketShouldBe: priceOnMarketShouldBe.toFixed(2),
    sellProfit,
    setTargetPrice,
  };
}

export default usePrice;
