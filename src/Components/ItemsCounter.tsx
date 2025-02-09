import { memo } from "react";
import { useAppSelector } from "../hooks/useAppSelector ";

function ItemsCounter() {
  const itemsAmmount = useAppSelector((state) => state.profile.notPickedItems.length);
  return <h2>Total unique items: {itemsAmmount}</h2>;
}

export default memo(ItemsCounter);
