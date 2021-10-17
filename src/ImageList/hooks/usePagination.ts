import { useEffect, useState } from "react";

export default function usePagination(currentPage: number) {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(Math.max(1, currentPage));
  }, [currentPage]);

  return {
    page,
    lowerBoundaryHit: page === 1,
    uppedBoundaryHit: false,
    nextPage: () => setPage((x) => x + 1),
    prevPage: () => setPage((x) => Math.max(1, x - 1)),
  };
}
