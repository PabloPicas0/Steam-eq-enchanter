import FilterIcon from "../Icons/FilterIcon";

function Filter(props: { className: string }) {
  const { className } = props;

  return (
    <button className={className}>
      Filter <FilterIcon width={15} height={15} />
    </button>
  );
}

export default Filter;
