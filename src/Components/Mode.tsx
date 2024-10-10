import { useAppSelector } from "../hooks/useAppSelector ";
import MarketItemsSearch from "./MarketItemsSearch";
import Equipment from "./Equipment";

function Mode() {
  const isUserEquipment = useAppSelector((state) => state.itemsFromMarket.isUserEquipment);

  return isUserEquipment ? <Equipment /> : <MarketItemsSearch />;
}

export default Mode
