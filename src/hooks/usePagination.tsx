import { useState } from "react";

function usePagination(length: number) {
  const [pagination, setPagination] = useState({
    start: 0,
    end: length < 55 ? length : 55,
  });

    if (pagination.end > length || (pagination.end < length && pagination.end !== 55)) {
      setPagination({ start: 0, end: length < 55 ? length : 55 });
    }

  function moveBackwards(prev: { start: number; end: number }) {
    if (prev.start - 56 < 0) return prev;

    return { start: prev.start - 56, end: prev.start - 1 };
  }

  function moveForeword(prev: { start: number; end: number }) {
    if (prev.end === length) return prev;

    if (prev.end + 56 > length) return { start: prev.end + 1, end: length };

    return { start: prev.end + 1, end: prev.end + 56 };
  }

  return { pagination, setPagination, moveBackwards, moveForeword };
}

export default usePagination;
