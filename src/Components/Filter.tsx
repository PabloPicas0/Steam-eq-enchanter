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

function Filter() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="filter">
      <button className="filter-btn" onClick={() => setIsClicked((prev) => !prev)}>
        Filter <FilterIcon width={15} height={15} />
      </button>

      <div
        className="filter-options-wrapper"
        style={{ visibility: isClicked ? "visible" : "hidden", opacity: isClicked ? 1 : 0 }}>
        {itemQualityTypes.map((type) => {
          const [name, color] = type;

          return (
            <div className="filter-item" style={{ color: color }}>
              <input type="checkbox" id={name} />
              <label htmlFor={name}>{name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filter;
