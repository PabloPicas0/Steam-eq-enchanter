import { EquipmentModel } from "../../models/EquipmentModel";
import FilterFavourite from "./FilterFavourite";
import FilterQuality from "./FilterQuality";

// TODO: This component is to complete refactor
function FilterSettings(props: {
  itemsAmmount: number;
  nameFilter: string;
  items: EquipmentModel;
  currencyCode: string;
  currenciesCodes: string[];
  qualityFilter: string;
  sortAscending: boolean;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
  setQualityFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    currenciesCodes,
    currencyCode,
    items,
    itemsAmmount,
    nameFilter,
    qualityFilter,
    sortAscending,
    setCurrencyCode,
    setNameFilter,
    setQualityFilter,
    setSortAscending,
  } = props;
  return (
    <div>
      <h2>Total unique items: {itemsAmmount}</h2>

      <div className="inputs-wrapper">
        <input
          className="input-steamID input-filter-equipment"
          type="text"
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value.replace("\\", ""));
          }}
          placeholder="Search"
        />

        <button
          title={`Sorted ${sortAscending ? "ascending" : " descending"}`}
          className="sort-btn"
          onClick={() => setSortAscending((prev) => !prev)}>
          Sort {sortAscending ? "\u2191" : "\u2193"}
        </button>

        <FilterQuality qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} />
        <FilterFavourite items={items} />

        <select
          value={currencyCode}
          onChange={(e) => setCurrencyCode(e.target.value)}
          className="currency-select">
          <option value={"PLN"}>PLN</option>
          {currenciesCodes.map((currCode) => {
            return (
              <option key={currCode} value={currCode}>
                {currCode}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default FilterSettings;
