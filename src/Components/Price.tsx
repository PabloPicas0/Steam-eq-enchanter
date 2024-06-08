import { ReactNode } from "react";
import { PriceHistoryModel } from "../models/PriceHistoryModel";

function Price(props: { price?: null | string | PriceHistoryModel; children: ReactNode; fallback: ReactNode }) {
  const { price, children, fallback } = props;

  if (price === undefined) return null;

  return <div className="item-price-wrapper">{price === null ? <>{fallback}</> : <>{children}</>}</div>;
}

export default Price;
