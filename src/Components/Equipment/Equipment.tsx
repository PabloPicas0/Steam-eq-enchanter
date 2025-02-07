import "../../styles/Equipment.css";

import PickedItems from "./PickedItems";

import { useAppSelector } from "../../hooks/useAppSelector ";
import NotPickedItems from "./NotPickedItems";

function Equipment() {
  const currencies = useAppSelector((state) => state.profile.currencies);

  return (
    <section className="equipment">
      <PickedItems currencies={currencies[0]} />
      <NotPickedItems currencies={currencies[0]} />
    </section>
  );
}

export default Equipment;
