import { useState } from "react";

function useFiter() {
  const [nameFilter, setNameFilter] = useState("");
  const [qualityFilter, setQualityFilter] = useState("12345678");
  const [sortAscending, setSortAscending] = useState(true);
 
  return {
    nameFilter,
    sortAscending,
    qualityFilter,
    setNameFilter,
    setSortAscending,
    setQualityFilter,
  };
}

export default useFiter;
