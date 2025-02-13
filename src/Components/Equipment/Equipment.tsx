import "../../styles/Equipment.css";

import PickedItems from "./PickedItems";

import Items from "./Items";
import ItemsSettings from "./ItemsSettings";

function Equipment() {
  return (
    <section className="equipment">
      <PickedItems />
      <ItemsSettings />
      <Items />
    </section>
  );
}

export default Equipment;
