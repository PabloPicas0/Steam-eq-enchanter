import { useMemo, useState } from "react";
import "../styles/Equipment.css";

import { EquipmentModel } from "../models/EquipmentModel";
import { ItemModel } from "../models/ItemsModel";
import { CurrencyTableModel } from "../models/CurrencyModel";

import useFiter from "../hooks/useFilter";

import getCorrectItemCurrency from "../utils/getCorrectItemCurrency";
import EquipmentItems from "./EquipmentItems";
import EquipmentPickedItems from "./EquipmentPickedItems";
import EquipmentFilter from "./EqupimentFilter";

type PropTypes = {
  items: EquipmentModel;
  currencies: CurrencyTableModel;
};

function Equipment(props: PropTypes) {
  const { items, currencies } = props;

  const [fItems, setFItems] = useState<EquipmentModel["assets"]>([])
  const [pickedItems, setPickedItems] = useState<ItemModel[]>([]);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const {
    filteredItems,
    nameFilter,
    sortAscending,
    qualityFilter,
    setNameFilter,
    setSortAscending,
    setQualityFilter,
  } = useFiter(items);

  const currenciesCodes = currencies[0].rates.map((rate) => rate.code);
  const pickedCurrencyData = currencies[0].rates.find((rate) => rate.code === currencyCode);

  const itemsWithCorrecetedCurrency = useMemo(
    () => getCorrectItemCurrency(pickedItems, pickedCurrencyData),
    [pickedItems, currencyCode]
  );

  return (
    <section className="equipment">
      <EquipmentPickedItems
        pickedItems={pickedItems}
        itemsWithCorrecetedCurrency={itemsWithCorrecetedCurrency}
        setPickedItems={setPickedItems}
      />

      <div>
        <h2>Total unique items: {filteredItems.length}</h2>

        <EquipmentFilter
          currenciesCodes={currenciesCodes}
          currencyCode={currencyCode}
          nameFilter={nameFilter}
          qualityFilter={qualityFilter}
          sortAscending={sortAscending}
          setCurrencyCode={setCurrencyCode}
          setNameFilter={setNameFilter}
          setQualityFilter={setQualityFilter}
          setSortAscending={setSortAscending}
        />
      </div>

      <EquipmentItems filteredItems={filteredItems} setPickedItems={setPickedItems} />
    </section>
  );
}

export default Equipment;
