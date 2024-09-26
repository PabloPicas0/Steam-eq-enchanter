import Filter from "./Filter";

type PropTypes = {
  nameFilter: string;
  sortAscending: boolean;
  qualityFilter: string;
  currencyCode: string;
  setCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
  setQualityFilter: React.Dispatch<React.SetStateAction<string>>;
  currenciesCodes: string[];
};

function EquipmentFilter(props: PropTypes) {
  const {
    currenciesCodes,
    nameFilter,
    qualityFilter,
    currencyCode,
    setCurrencyCode,
    setNameFilter,
    setQualityFilter,
    setSortAscending,
    sortAscending,
  } = props;

  return (
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

      <Filter qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} />

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
  );
}

export default EquipmentFilter;
