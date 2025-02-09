import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import HeartIcon from "../../Icons/HeartIconBlack.svg";

import { loadFavouriteItems, removeFromFavouriteItems } from "../../Store/Slices/profileSlice";
import { useAppSelector } from "../../hooks/useAppSelector ";
import BinIcon from "../../Icons/BinIcon";
import { EquipmentModel } from "../../models/EquipmentModel";

function FilterFavourite(props: { items: EquipmentModel }) {
  const { items } = props;

  const favItems = useAppSelector((state) => state.profile.favouriteItems);
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useAppDispatch();

  const visibilityState = isClicked ? "visible" : "hidden";
  const opacityState = isClicked ? 1 : 0;
  const zIndexState = isClicked ? 2 : "auto";

  // Readjust state if user deleted all fav items and isClcked state is still true
  if (isClicked && !favItems.length) setIsClicked(false);

  if (!favItems.length)
    return (
      <div className="filter">
        <button title="Favourite" className="favourite-items filter-quality-btn">
          Favourites
          <img src={HeartIcon} width={15} height={15} />
        </button>
      </div>
    );

  return (
    <div className="filter">
      <button
        title="Favourite"
        className="favourite-items filter-quality-btn"
        style={{ zIndex: zIndexState }}
        onClick={() => setIsClicked((prev) => !prev)}>
        Favourites
        <img src={HeartIcon} width={15} height={15} />
      </button>

      <div
        className="filter-quality-options-wrapper filter-favourite-options-wrapper"
        style={{ visibility: visibilityState, opacity: opacityState, zIndex: zIndexState }}>
        <div className="fav-items">
          {favItems.map((favItem, idx) => {
            const isInEq = items.assets.some((asset) => asset.market_name === favItem);
            const color = isInEq ? "green" : "red";

            return (
              <div key={favItem + idx} className="fav-item">
                <p style={{ color: color }}>{favItem}</p>

                <button className="fav-item-btn" onClick={() => dispatch(removeFromFavouriteItems(favItem))}>
                  <BinIcon fill="lightgray" />
                </button>
              </div>
            );
          })}
        </div>

        <button
          style={{ width: "100%" }}
          onClick={() => {
            dispatch(loadFavouriteItems());
            setIsClicked(false);
          }}>
          Show
        </button>
      </div>

      {isClicked && <div className="filter-unclick-area" onClick={() => setIsClicked(false)}></div>}
    </div>
  );
}

export default FilterFavourite;
