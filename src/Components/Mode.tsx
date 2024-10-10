import { useAppSelector } from "../hooks/useAppSelector ";
import MarketItems from "./MarketItems";
import Equipment from "./Equipment";

function Mode() {
  const isUserEquipment = useAppSelector((state) => state.profile.isUserEquipment);

  return isUserEquipment ? <Equipment /> : <MarketItems />;
}

export default Mode
