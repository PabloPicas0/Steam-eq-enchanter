function AmmountIcon(props: { width: number; height: number }) {
  const { height, width } = props;
  
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="3"
      stroke="#fafafa"
      fill="none"
      width={width}
      height={height}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M11.39,19.82,32.1,30.48a.51.51,0,0,0,.45,0L54.21,19.81a.5.5,0,0,0,0-.89L33.72,8.45a2,2,0,0,0-1.82,0L11.4,18.93A.5.5,0,0,0,11.39,19.82Z"
          stroke-linecap="round"></path>
        <path d="M10.83,32.23l21.27,11h.45l22.25-11" strokeLinecap="round"></path>
        <path d="M10.83,44.94l21.27,11h.45l22.25-11" strokeLinecap="round"></path>
      </g>
    </svg>
  );
}

export default AmmountIcon;
