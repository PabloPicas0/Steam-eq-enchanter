import { area, select, scaleLinear, extent, max, axisBottom, axisLeft, scaleUtc, pointer } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Area.css";

import { AreaPropsModel } from "../models/AreaPropsModel";

function Area({
  data,
  targetPrice,
  setNewPrice,
  width = 800,
  height = 400,
  marginTop = 20,
  marginRight = 10,
  marginBottom = 20,
  marginLeft = 45,
}: AreaPropsModel) {
  const TODAY = useMemo(() => Date.now(), []);
  const ONE_MONTH = 31;
  const ONE_WEEK = 7;
  const ALL_TIME = useMemo(() => TODAY, []);

  const [scope, setScope] = useState(ALL_TIME);
  const [isMouseClicked, setIsMouseClicked] = useState(false);

  // This copies data from 7 days, 31 days or overall
  const timestamp = TODAY - scope * 24 * 60 * 60 * 1000;
  const scopeIndex = data.findIndex((date) => new Date(date[0]).getTime() >= timestamp);
  const chart = data.slice(scopeIndex);

  const timeScale = chart.map((time) => new Date(time[0]));
  const areaData = chart.map((vector) => ({ date: new Date(vector[0]), price: vector[1] }));

  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const x = scaleUtc(extent(timeScale, (time) => time) as Date[], [marginLeft, width - marginRight]);
  const y = scaleLinear([0, max(chart, (d) => d[1]) as number], [height - marginBottom, marginTop]);

  const chartArea = area<{ date: Date; price: Number }>(
    (d) => x(d.date),
    y(0),
    (d) => y(d.price)
  );

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

  function updatePosition(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const [_, ey] = pointer(e);
    const mouseData = y.invert(ey);

    if (ey < marginTop + 4 || ey > height - (marginBottom + 5)) {
      return;
    }

    setNewPrice(parseFloat(mouseData.toFixed(2)));
  }

  return (
    <div className="area-container">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: "100%", height: "auto" }}
        onMouseDown={(e) => {
          setIsMouseClicked(true);
          updatePosition(e);
        }}
        onMouseMove={(e) => {
          if (!isMouseClicked) return;
          updatePosition(e);
        }}
        onMouseUp={() => setIsMouseClicked(false)}
        onMouseLeave={() => setIsMouseClicked(false)}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`}></g>
        <g ref={gy} transform={`translate(${marginLeft},0)`}></g>

        <path fill="steelblue" stroke="currentColor" strokeWidth="0.5" d={chartArea(areaData) as string} />

        <rect
          fill="red"
          x={0}
          y={y(targetPrice)}
          width={width - (marginRight + marginLeft)}
          height={1}
          style={{ cursor: "pointer" }}
          transform={`translate(${marginLeft}, 0)`}
        />

        <text
          x={width - 55}
          y={y(targetPrice) - 10}
          className="tooltip"
          fill="white"
          style={{ opacity: isMouseClicked ? 1 : 0 }}>
          {targetPrice.toFixed(2)}
        </text>
      </svg>

      <div className="chart-scope-wrapper">
        <span>Chart scope:</span>
        <button onClick={() => setScope(ONE_WEEK)}>Weekly</button>
        <button onClick={() => setScope(ONE_MONTH)}>Monthly</button>
        <button onClick={() => setScope(ALL_TIME)}>Overall</button>
      </div>
    </div>
  );
}

export default Area;
