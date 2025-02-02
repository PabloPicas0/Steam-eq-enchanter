import { useState } from "react";

type PaginationPropTypes = {
  lastPage: number;
  parentRef: React.RefObject<HTMLDivElement | null>;
};

function Pagination(props: PaginationPropTypes) {
  const { lastPage, parentRef } = props;

  const [currentPage, setCurrentPage] = useState(1);
  // console.log(1830 * lastPage)
  const goToPrevious = () => {
    if (!parentRef.current) return;

    parentRef.current.scrollLeft += -parentRef.current.offsetWidth;
    const page = Math.floor(parentRef.current.scrollLeft / 1830);
    setCurrentPage(page > 1 ? page : 1);
  };

  const goToNext = () => {
    if (!parentRef.current) return;

    parentRef.current.scrollLeft += parentRef.current.offsetWidth;
    const page = Math.floor(parentRef.current.scrollLeft / 1830);
    console.log(parentRef.current.scrollLeft / 1830, parentRef.current.scrollLeft);
    setCurrentPage(page > 1 ? page : 1);
  };

  return (
    <div className="pagination">
      <button onClick={goToPrevious}>Back</button>

      {`${currentPage} / ${lastPage}`}

      <button onClick={goToNext}>Next</button>
    </div>
  );
}

export default Pagination;
