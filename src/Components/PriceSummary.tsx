import { useState } from "react";

type PriceSummaryProps = {
  priceSuffix?: string;
  market_price: string;
  sellProfit: number;
  buyProfit: number;
  iGetFromCurrentPrice: number;
};

function PriceSummary(props: PriceSummaryProps) {
  const { buyProfit, iGetFromCurrentPrice, market_price, priceSuffix, sellProfit } = props;

  const [isClicked, setIsClicked] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(1);

  const currentAmountIsNaN = Number.isNaN(currentAmount);
  const sell = currentAmountIsNaN ? "0.00" : (iGetFromCurrentPrice * currentAmount).toFixed(2);
  const spend = currentAmountIsNaN ? "0.00" : (Number(market_price) * currentAmount).toFixed(2);
  const buyColors = buyProfit > 0 ? "green" : "red";
  const sellColors = sellProfit > 0 ? "green" : "red";

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
          value={currentAmount || ""}
          onChange={(e) => {
            const { valueAsNumber } = e.target;

            if (valueAsNumber < 1 || valueAsNumber > 10000) return;

            setCurrentAmount(e.target.valueAsNumber);
          }}
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

      <p className="item-price-summary" style={{ color: sellColors }}>
        Sell profit: {sellProfit} {priceSuffix}
      </p>

      <p className="item-price-summary" style={{ color: buyColors }}>
        Buy Profit: {buyProfit} {priceSuffix}
      </p>
    </>
  );
}

export default PriceSummary;
