function Sort(props: {
  sortAscending: boolean;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { sortAscending, setSortAscending } = props;

  return (
    <button
      title={`Sorted ${sortAscending ? "ascending" : " descending"}`}
      className="sort-btn"
      onClick={() => setSortAscending((prev) => !prev)}>
      Sort {sortAscending ? "\u2191" : "\u2193"}
    </button>
  );
}

export default Sort;
