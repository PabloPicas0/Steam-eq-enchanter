function GoToTopIcon(props: { width?: string; height?: string; fill?: string }) {
  const { width, height, fill } = props;

  return (
    <svg
      width={width || "15px"}
      height={height || "15px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M17 15L12 10L7 15"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"></path>{" "}
      </g>
    </svg>
  );
}

export default GoToTopIcon;
