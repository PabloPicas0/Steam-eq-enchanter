import { ReactNode } from "react";

type PriceProps = {
  price?: null | string;
  children: ReactNode;
  fallback: ReactNode;
}

function Price(props: PriceProps) {
  const { price, children, fallback } = props;

  if (price === undefined) return null;

  return <div className="item-price-wrapper">{price === null ? <>{fallback}</> : <>{children}</>}</div>;
}

export default Price;
