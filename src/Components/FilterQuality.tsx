import { useState } from "react";

import FilterIcon from "../Icons/FilterIcon";

import "../styles/Filter.css";

const itemQualityTypes = [
  ["Common", "rgb(176, 195, 217)"],
  ["Uncommon", "rgb(94, 152, 217)"],
  ["Rare", "rgb(75, 105, 255)"],
  ["Mythical", "rgb(136, 71, 255)"],
  ["Legendary", "rgb(211, 44, 230)"],
  ["Ancient", "rgb(235, 75, 75)"],
  ["Special", "rgb(134 80 172)"],
  ["Contraband", "rgb(228, 174, 57)"],
];

function FilterQuality(props: {
  setQualityFilter: React.Dispatch<React.SetStateAction<string>>;
  qualityFilter: string;
}) {
  const { qualityFilter, setQualityFilter } = props;

  const [isClicked, setIsClicked] = useState(false);

  const visibilityState = isClicked ? "visible" : "hidden";
  const opacityState = isClicked ? 1 : 0;

  function addQuality(prevState: string, currentQualityType: string) {
    return prevState + currentQualityType;
  }

  function deleteQuality(prevState: string, currentQualityType: string) {
    return prevState.replace(currentQualityType, "");
  }

  return (
    <div className="filter-quality">
      <button className="filter-quality-btn" onClick={() => setIsClicked((prev) => !prev)}>
        Filter <FilterIcon width={15} height={15} />
      </button>

      <div
        className="filter-quality-options-wrapper"
        style={{ visibility: visibilityState, opacity: opacityState }}>
        {itemQualityTypes.map((type, idx) => {
          const [name, color] = type;
          const qualityType = (idx + 1).toString();
          const isSelected = qualityFilter.includes(qualityType);
          const handleQuality = isSelected ? deleteQuality : addQuality;

          return (
            <div key={name} className="filter-quality-item" style={{ color: color }}>
              <input
                type="checkbox"
                id={name}
                checked={isSelected}
                onChange={() => setQualityFilter((prev) => handleQuality(prev, qualityType))}
              />
              <label htmlFor={name}>{name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterQuality;
