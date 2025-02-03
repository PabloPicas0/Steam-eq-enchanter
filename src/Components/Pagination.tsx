import { useState } from "react";

type PaginationPropTypes = {
  lastPage: number;
  parentRef: React.RefObject<HTMLDivElement | null>;
};

function Pagination(props: PaginationPropTypes) {
  const { lastPage, parentRef } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const goToPrevious = () => {
    if (!parentRef.current) return;
    const offset = parentRef.current.offsetWidth + 100;
    const nextPage = (parentRef.current.scrollLeft += -offset);
    const pageNumber = Math.round(nextPage / offset) + 1;

    parentRef.current.scrollLeft = nextPage;
    setCurrentPage(pageNumber < 1 ? currentPage : pageNumber);
  };

  const goToNext = () => {
    if (!parentRef.current) return;
    const offset = parentRef.current.offsetWidth + 100;
    const nextPage = parentRef.current.scrollLeft + offset;
    const pageNumber = Math.round(nextPage / offset) + 1;

    parentRef.current.scrollLeft = nextPage;
    setCurrentPage(pageNumber > lastPage ? currentPage : pageNumber);
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
