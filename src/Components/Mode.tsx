import { useAppSelector } from "../hooks/useAppSelector ";
import Market from "./Market/Market";
import Equipment from "./Equipment/Equipment";

function Mode() {
  const isUserEquipment = useAppSelector((state) => state.itemsFromMarket.isUserEquipment);

  return isUserEquipment ? <Equipment /> : <Market />;
}

export default Mode;
