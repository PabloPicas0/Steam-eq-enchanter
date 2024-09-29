import HeartIcon from "../Icons/Heartcon";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToFavouriteItems, removeFromFavouriteItems } from "../Store/Slices/profileSlice";
import { useAppSelector } from "../hooks/useAppSelector ";

function Favourite(props: { className?: string; itemID: string }) {
  const { className, itemID } = props;

  const favourite = useAppSelector((state) => state.profile.favouriteItems);
  const isFavourite = favourite.includes(itemID);
  const handleFavourite = isFavourite ? removeFromFavouriteItems : addToFavouriteItems;

  const dispatch = useAppDispatch();

  return (
    <button className={className} onClick={() => dispatch(handleFavourite(itemID))}>
      <HeartIcon width="20px" height="20px" color="#ff0000" fill={isFavourite ? "red" : ""} />
    </button>
  );
}

export default Favourite;
