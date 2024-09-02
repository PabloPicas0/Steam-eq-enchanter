import { useState } from "react";

const ITEMS_START_AMMOUNT = 24
const NEXT_ITEMS_AMMOUNT = 25;

function usePagination(length: number) {
  const [prevLength, setPrevLength] = useState(length);
  const [pagination, setPagination] = useState({
    start: 0,
    end: length < ITEMS_START_AMMOUNT ? length : ITEMS_START_AMMOUNT,
  });

  if (prevLength !== length) {
    setPagination({
      start: 0,
      end: length < ITEMS_START_AMMOUNT ? length : ITEMS_START_AMMOUNT,
    });
    setPrevLength(length);
  }

  function moveBackwards(prev: { start: number; end: number }) {
    if (prev.start - NEXT_ITEMS_AMMOUNT < 0) return prev;

    return { start: prev.start - NEXT_ITEMS_AMMOUNT, end: prev.start - 1 };
  }

  function moveForeword(prev: { start: number; end: number }) {
    if (prev.end === length) return prev;

    if (prev.end + NEXT_ITEMS_AMMOUNT > length) return { start: prev.end + 1, end: length };

    return { start: prev.end + 1, end: prev.end + NEXT_ITEMS_AMMOUNT };
  }

  return { pagination, setPagination, moveBackwards, moveForeword };
}

export default usePagination;
