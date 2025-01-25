import { useState } from "react";

type PriceSummaryProps = {
  priceSuffix?: string;
  market_price: string;
  sellProfit: number;
  buyProfit: number;
  amount: number;
  iGetFromCurrentPrice: number;
};

function PriceSummary(props: PriceSummaryProps) {
  const { amount, buyProfit, iGetFromCurrentPrice, market_price, priceSuffix, sellProfit } = props;

  const [isClicked, setIsClicked] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(1);

  const sell = (iGetFromCurrentPrice * currentAmount).toFixed(2);
  const spend = (Number(market_price) * currentAmount).toFixed(2);

  return isClicked ? (
    <>
      <h2 className="item-price-summary-header item-price-summary" onClick={() => setIsClicked(false)}>
        Calculations
      </h2>

      <div style={{ display: "flex", gap: 5 }}>
        <p className="item-price-summary">Amount:</p>
        <input
          className="item-price-summary-input"
          style={{ width: `${1 + currentAmount.toString().length}ch` }}
          type="number"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.valueAsNumber)}
        />
      </div>

      <p className="item-price-summary">
        Earn from sell: {sell} {priceSuffix}
      </p>

      <p className="item-price-summary">
        Spend for buy: {spend} {priceSuffix}
      </p>
    </>
  ) : (
    <>
      <h2 className="item-price-summary-header item-price-summary" onClick={() => setIsClicked(true)}>
        Investing
      </h2>

      <p className="item-price-summary">
        Current price: {market_price} {priceSuffix}
      </p>

      <p className="item-price-summary">
        Sell profit: {sellProfit} {priceSuffix}
      </p>

      <p className="item-price-summary">
        Buy Profit: {buyProfit} {priceSuffix}
      </p>
    </>
  );
}

export default PriceSummary;
