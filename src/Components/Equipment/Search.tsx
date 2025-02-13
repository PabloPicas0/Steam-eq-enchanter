function Search(props: { search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  const { search, setSearch } = props;

  return (
    <input
      className="input-steamID input-filter-equipment"
      type="text"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value.replace("\\", ""));
      }}
      placeholder="Search"
    />
  );
}

export default Search;
