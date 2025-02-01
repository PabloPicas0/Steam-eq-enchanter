import { useState } from "react";

type PaginationPropTypes = {
  nextPage: () => void;
  previousPage: () => void;
  lastPage: number;
};

function Pagination(props: PaginationPropTypes) {
  const { nextPage, previousPage, lastPage } = props;

  const [currentPage, setCurrentPage] = useState(1);

  function goBack() {
    previousPage();
    setCurrentPage((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  }

  function goNext() {
    nextPage();
    setCurrentPage((prev) => (prev + 1 <= lastPage ? prev + 1 : prev));
  }

  return (
    <div className="pagination">
      <button onClick={goBack}>Back</button>

      {`${currentPage} / ${lastPage}`}

      <button onClick={goNext}>Next</button>
    </div>
  );
}

export default Pagination;
