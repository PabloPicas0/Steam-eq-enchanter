function Logo(props: { width?: string; height?: string }) {
  const { height, width } = props;

  return (
    <svg
      width={width || "100px"}
      height={height || "100px"}
      viewBox="0 0 32 32"
      id="_x3C_Layer_x3E_"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <style type="text/css">
          {" "}
          {`
          .st0{
            fill:none;
            stroke:#455A64;
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-miterlimit:10;
          } 
           
           .st1{
            fill:none;
            stroke:whitesmoke;
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-miterlimit:10;
           }`
           }
        </style>{" "}
        <g id="USDC_x2C__usd_coin">
          {" "}
          <g id="XMLID_2_">
            {" "}
            <circle className="st1" cx="16" cy="16" id="XMLID_174_" r="14.5"></circle>{" "}
            <path
              className="st1"
              d="M12.5,18.5v0.22c0,1.26,1.02,2.28,2.28,2.28h2.44c1.26,0,2.28-1.02,2.28-2.28l0,0 c0-1.02-0.67-1.91-1.65-2.19l-3.69-1.05c-0.98-0.28-1.65-1.17-1.65-2.19l0,0c0-1.26,1.02-2.28,2.28-2.28h2.44 c1.26,0,2.28,1.02,2.28,2.28v0.22"
              id="XMLID_72_"></path>{" "}
            <line className="st1" id="XMLID_3_" x1="16" x2="16" y1="23" y2="21"></line>{" "}
            <line className="st1" id="XMLID_4_" x1="16" x2="16" y1="11" y2="9"></line>{" "}
            <path
              className="st1"
              d="M12.5,6.11c-4.08,1.44-7,5.32-7,9.89s2.92,8.45,7,9.89"
              id="XMLID_7_"></path>{" "}
            <path
              className="st1"
              d="M19.5,25.89c4.08-1.44,7-5.32,7-9.89s-2.92-8.45-7-9.89"
              id="XMLID_6_"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default Logo;
