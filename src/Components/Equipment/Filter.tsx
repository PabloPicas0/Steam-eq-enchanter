import { useMemo, useState } from "react";

import FilterIcon from "../../Icons/FilterIcon.svg";

import "../../styles/Filter.css";
import Accordion from "../Accordion";
import { EquipmentModel } from "../../models/EquipmentModel";

enum ItemTypesHierarchy {
  "Knife",
  "Pistol",
  "Heavy",
  "SMG",
  "Rifle",
  "Sniper",
}

type TypesHierarchy = keyof typeof ItemTypesHierarchy;

const itemsTypes: [string, string][] = [
  [
    "Knife",
    "Bayonet, Bowie, Butterfly, Classic, Falchion, Flip, Gut, Huntsman, Karambit, Kukri, Navaja, Nomad, Paracord, Daggers, Skeleton, Stiletto, Survival, Talon, Ursus,",
  ],
  ["Pistol", "CZ75 , Deagle , Berettas , Five-SeveN , Glock-18 , P2000 , P250 , Revolver , Tec-9 , USP-S,"],
  ["Heavy", "MAG-7 , Nova , Sawed-Off , XM1014, M249 , Negev,"],
  ["SMG", "MAC-10 , MP5-SD , MP7 , MP9 , P90 , PP-Bizon , UMP-45,"],
  ["Rifle", "AK-47 , AUG , FAMAS , Galil AR , M4A1-S , M4A4 , SG 553,"],
  ["Sniper", "AWP , G3SG1 , SCAR-20 , SSG 08"],
];

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

type FilterProps = {
  setQualityFilter: React.Dispatch<React.SetStateAction<string>>;
  setWeaponFilter: React.Dispatch<React.SetStateAction<string[][]>>;
  items: EquipmentModel;
  weaponFilter: string[][];
  qualityFilter: string;
};

function addQuality(prevState: string, currentQualityType: string) {
  return prevState + currentQualityType;
}

function deleteQuality(prevState: string, currentQualityType: string) {
  return prevState.replace(currentQualityType, "");
}

function additem(prevState: string[][], currentItem: string, itemType: string) {
  return [...prevState, [currentItem, itemType]];
}

function deleteItem(prevState: string[][], itemToDelete: string) {
  return prevState.filter((item) => item[0] !== itemToDelete);
}

function Filter(props: FilterProps) {
  const { qualityFilter, weaponFilter, items, setWeaponFilter, setQualityFilter } = props;

  const [isClicked, setIsClicked] = useState(false);

  const visibilityState = isClicked ? "visible" : "hidden";
  const opacityState = isClicked ? 1 : 0;
  const zIndexState = isClicked ? 2 : "auto";

  const types = useMemo(() => {
    const typesRegex = new RegExp(itemsTypes.map((type) => type[0]).join("|"), "i");
    const itemsRegex = new RegExp(
      itemsTypes
        .map((type) => type[1])
        .join("")
        .split(",")
        .map((weapon) => weapon.trim())
        .join("|"),
      "i"
    );

    const itemsOfType = items.assets.reduce((acc, asset) => {
      const assetType = asset.type.match(typesRegex);
      const assetName = asset.name.match(itemsRegex);

      if (!assetType || !assetName) return acc;

      const [type, name] = [assetType[0], assetName[0]];

      if (!acc[type]) {
        acc[type] = [name];
      } else {
        acc[type].push(name);
      }

      return acc;
    }, {} as { [key: string]: string[] });

    // Remove duplicate items 
    Object.keys(itemsOfType).forEach((key) => (itemsOfType[key] = [...new Set(itemsOfType[key])]));

    return Object.entries(itemsOfType).sort(
      (a, b) => ItemTypesHierarchy[a[0] as TypesHierarchy] - ItemTypesHierarchy[b[0] as TypesHierarchy]
    );
  }, []);

  return (
    <div className="filter">
      <button
        className="filter-quality-btn"
        style={{ zIndex: zIndexState }}
        onClick={() => setIsClicked((prev) => !prev)}>
        Filter <img src={FilterIcon} width={15} height={15} />
      </button>

      <div
        className="filter-quality-options-wrapper"
        style={{ visibility: visibilityState, opacity: opacityState, zIndex: zIndexState }}>
        <Accordion title="Quality">
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
        </Accordion>

        <Accordion title="Weapons">
          {types.map((type) => {
            const [typeName, items] = type;

            return (
              <Accordion title={typeName} key={typeName}>
                {items.map((item) => {
                  const itemName = item.trim();
                  const isSelected = weaponFilter.some((weapon) => weapon.includes(itemName));
                  const handleQuality = isSelected ? deleteItem : additem;

                  return (
                    <div key={itemName} className="filter-quality-item">
                      <input
                        type="checkbox"
                        id={itemName}
                        checked={isSelected}
                        onChange={() => setWeaponFilter((prev) => handleQuality(prev, itemName, typeName))}
                      />
                      <label htmlFor={itemName}>{itemName}</label>
                    </div>
                  );
                })}
              </Accordion>
            );
          })}
        </Accordion>
      </div>

      {isClicked && <div className="filter-unclick-area" onClick={() => setIsClicked(false)}></div>}
    </div>
  );
}

export default Filter;
