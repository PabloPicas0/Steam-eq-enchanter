import { useAppSelector } from "../hooks/useAppSelector ";
import Market from "./Market";
import Equipment from "./Equipment";

function Mode() {
  const isUserEquipment = useAppSelector((state) => state.itemsFromMarket.isUserEquipment);

  return isUserEquipment ? <Equipment /> : <Market />;
}

export default Mode
