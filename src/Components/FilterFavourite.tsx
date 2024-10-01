import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import HeartIcon from "../Icons/Heartcon";

import { loadFavouriteItems, removeFromFavouriteItems } from "../Store/Slices/profileSlice";
import { useAppSelector } from "../hooks/useAppSelector ";
import BinIcon from "../Icons/BinIcon";

function FilterFavourite() {
  const favItems = useAppSelector((state) => state.profile.favouriteItems);
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useAppDispatch();

  const visibilityState = isClicked ? "visible" : "hidden";
  const opacityState = isClicked ? 1 : 0;

  return (
    <div className="filter">
      <button
        title="Favourite"
        className="favourite-items filter-quality-btn"
        onClick={() => setIsClicked((prev) => !prev)}>
        Favourites
        <HeartIcon />
      </button>

      {favItems.length ? (
        <div
          className="filter-quality-options-wrapper filter-favourite-options-wrapper"
          style={{ visibility: visibilityState, opacity: opacityState }}>
          <div className="fav-items">
            {favItems.map((favItem) => {
              return (
                <div className="fav-item">
                  <p>{favItem}</p>

                  <button
                    className="fav-item-btn"
                    onClick={() => dispatch(removeFromFavouriteItems(favItem))}>
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
      ) : null}
    </div>
  );
}

export default FilterFavourite;
