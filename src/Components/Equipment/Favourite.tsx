import HeartIcon from "../../Icons/HeartIcon.svg";
import HeartIconRed from "../../Icons/HeartIconRed.svg";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToFavouriteItems, removeFromFavouriteItems } from "../../Store/Slices/profileSlice";
import { useAppSelector } from "../../hooks/useAppSelector ";

function Favourite(props: { className?: string; itemName: string }) {
  const { className, itemName } = props;

  const isFavourite = useAppSelector((state) => state.profile.favouriteItems.includes(itemName));

  const handleFavourite = isFavourite ? removeFromFavouriteItems : addToFavouriteItems;

  const dispatch = useAppDispatch();

  return (
    <button className={className} onClick={() => dispatch(handleFavourite(itemName))}>
      <img src={isFavourite ? HeartIconRed : HeartIcon}/>
    </button>
  );
}

export default Favourite;
