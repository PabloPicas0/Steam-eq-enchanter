import { ReactNode } from "react";

function Price(props: { price?: null | string; children: ReactNode; fallback: ReactNode }) {
  const { price, children, fallback } = props;

  if (price === undefined) return null;

  return <div className="item-price-wrapper">{price === null ? <>{fallback}</> : <>{children}</>}</div>;
}

export default Price;
