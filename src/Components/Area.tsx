import { area, select, scaleLinear, extent, max, axisBottom, axisLeft, scaleUtc, curveBasis } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

import { AreaPropsModel } from "../models/AreaPropsModel";

// FIX: There is something wrong with charts date 
function Area({
  data,
  width = 800,
  height = 400,
  marginTop = 20,
  marginRight = 10,
  marginBottom = 20,
  marginLeft = 40,
}: AreaPropsModel) {
  const ONE_WEEK = data.length - 24 * 7;
  const ONE_MONTH = data.length - 24 * 31;
  const ALL_TIME = 0;

  const [someTimeAgo, setSomeTimeAgo] = useState(ALL_TIME);

  // This copies data from 7 days, 31 days or overall
  const chart = data.slice(someTimeAgo);

  const timeScale = useMemo(() => chart.map((time) => new Date(time[0])), [someTimeAgo]);
  const areaData = chart.map((vector) => ({ date: new Date(vector[0]), price: vector[1] }));

  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const x = scaleUtc(extent(timeScale, (time) => time) as Date[], [marginLeft, width - marginRight]);
  const y = scaleLinear([0, max(chart, (d) => d[1]) as number], [height - marginBottom, marginTop]);

  const chartArea = area<{ date: Date; price: Number }>(
    (d) => x(d.date),
    y(0),
    (d) => y(d.price)
  ).curve(curveBasis);

  useEffect(() => {
    if (!gx.current) return;
    // This var converts each tick to year
    // Next is created set to remove duplicate years
    // After that we take arr length to set custom number of ticks on each axis
    // DO NOT DELETE MIGHT BE USEFUL IN THE FUTURE

    // const ticksNumber = Array.from(new Set(x.ticks().map(x.tickFormat(0, "%Y")))).length;

    void select(gx.current).call(axisBottom(x).ticks(7));
  }, [gx, x]);

  useEffect(() => {
    if (!gy.current) return;

    void select(gy.current).call(axisLeft(y).ticks(5, "$.2f"));
  }, [gy, y]);

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: "100%", height: "auto" }}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`}></g>
        <g ref={gy} transform={`translate(${marginLeft},0)`}></g>
        <path fill="steelblue" stroke="currentColor" strokeWidth="1.5" d={chartArea(areaData) as string} />
      </svg>

      <div style={{ display: "flex", justifyContent: "end", gap: "20px", zIndex: "20", alignItems: "center" }}>
        <span>Scope chart:</span>
        <button onClick={() => setSomeTimeAgo(ONE_WEEK)}>Weekly</button>
        <button onClick={() => setSomeTimeAgo(ONE_MONTH)}>Monthly</button>
        <button onClick={() => setSomeTimeAgo(ALL_TIME)}>Overall</button>
      </div>
    </>
  );
}

export default Area;
