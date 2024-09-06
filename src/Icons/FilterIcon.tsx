function FilterIcon(props: { width: number; height: number }) {
  const { width, height } = props;

  return (
    <svg
      fill="#000000"
      height={width}
      width={height}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.00 512.00"
      xmlSpace="preserve"
      transform="rotate(0)"
      stroke="#000000"
      strokeWidth="10.24">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="1.024"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M480.159,45.81H31.841C14.284,45.81,0,60.093,0,77.65v37.472c0,17.557,14.284,31.841,31.841,31.841h14.907L211.305,311.52 v144.056c0,4.293,2.586,8.163,6.552,9.806c1.313,0.543,2.692,0.808,4.059,0.808c2.763,0,5.478-1.078,7.508-3.109l68.559-68.56 c1.99-1.991,3.109-4.69,3.109-7.505v-75.498l164.554-164.555h14.514c17.557,0,31.841-14.284,31.841-31.841V77.65 C512,60.093,497.716,45.81,480.159,45.81z M282.968,299.621c-2.096,2.096-3.128,4.85-3.104,7.597v75.404l-47.332,47.332V307.156 c0.007-2.727-1.027-5.455-3.107-7.536L76.768,146.963h358.857L282.968,299.621z M490.773,115.122 c0,5.852-4.761,10.614-10.614,10.614H31.841c-5.852,0-10.614-4.761-10.614-10.614V77.65c0-5.852,4.761-10.614,10.614-10.614 h448.319c5.852,0,10.614,4.761,10.614,10.614V115.122z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default FilterIcon;
