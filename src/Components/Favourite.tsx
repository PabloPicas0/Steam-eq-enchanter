import { useState } from "react";
import HeartIcon from "../Icons/Heartcon";

function Favourite(props: { className?: string }) {
  const { className } = props;

  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <button className={className} onClick={() => setIsFavourite((prev) => !prev)}>
      <HeartIcon width="20px" height="20px" color="#ff0000" fill={isFavourite ? "red" : ""} />
    </button>
  );
}

export default Favourite;
