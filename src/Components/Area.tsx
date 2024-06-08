import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

import { AreaPropsModel } from "../models/AreaPropsModel";

// TODO: Add switching between time scales
function Area({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: AreaPropsModel) {
  const [time, setTime] = useState("month");

  const timeScale = useMemo(() => data.map((time) => new Date(time[0])), [time]);
  const areaData = data.map((point) => ({ date: new Date(point[0]), price: point[1] }));

  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const x = d3.scaleTime(d3.extent(timeScale, (time) => time) as Date[], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear([0, d3.max(data, (d) => d[1]) as number], [height - marginBottom, marginTop]);

  const area = d3.area<{ date: Date; price: Number }>(
    (d) => x(d.date),
    y(0),
    (d) => y(d.price)
  );


  useEffect(() => {
    if (!gx.current) return;

    void d3.select(gx.current).call(d3.axisBottom(x).ticks(7));
  }, [gx, x]);

  useEffect(() => {
    if (!gy.current) return;

    void d3.select(gy.current).call(d3.axisLeft(y).ticks(5));
  }, [gy, y]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: "100%", height: "auto" }}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`}></g>
      <g ref={gy} transform={`translate(${marginLeft},0)`}></g>
      <path fill="steelblue" stroke="currentColor" strokeWidth="1.5" d={area(areaData) as string} />
    </svg>
  );
}

export default Area;
