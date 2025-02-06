import { useState } from "react";
import "../../styles/Equipment.css";

import useFiter from "../../hooks/useFilter";

import Items from "./Items";
import PickedItems from "./PickedItems";
import FilterSettings from "./FilterSettings";

import { useAppSelector } from "../../hooks/useAppSelector ";

function Equipment() {
  const items = useAppSelector((state) => state.profile.items[1]);
  const currencies = useAppSelector((state) => state.profile.currencies);

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

  return (
    <section className="equipment">
      <PickedItems currencyCode={currencyCode} pickedCurrencyData={pickedCurrencyData} />

      <FilterSettings
        currenciesCodes={currenciesCodes}
        currencyCode={currencyCode}
        items={items}
        itemsAmmount={filteredItems.length}
        nameFilter={nameFilter}
        qualityFilter={qualityFilter}
        setCurrencyCode={setCurrencyCode}
        setNameFilter={setNameFilter}
        setQualityFilter={setQualityFilter}
        setSortAscending={setSortAscending}
        sortAscending={sortAscending}
      />

      <Items filteredItems={filteredItems} />
    </section>
  );
}

export default Equipment;
