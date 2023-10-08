import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SEARCH_PARAMS = {
  PAGE_SIZE: "pageSize",
  PAGE_INDEX: "pageIndex",
  TOTAL_COUNT: "totalCount",
};

export function useServerPagination(totalCount = 0) {
  const [searchParams, setSearchParams] = useSearchParams();
  const retriveStateFromSearchParams = (
    param: string,
    defaultValue: number,
  ) => {
    return Number(searchParams.get(param) || defaultValue);
  };

  const [pageSize] = useState(() =>
    retriveStateFromSearchParams(SEARCH_PARAMS.PAGE_SIZE, 100),
  );
  const [pageIndex, setPageIndex] = useState(() =>
    retriveStateFromSearchParams(SEARCH_PARAMS.PAGE_INDEX, 0),
  );

  const isNextButtonDisabled = pageIndex * pageSize + pageSize >= totalCount;
  const isPrevButtonDisabled = pageIndex === 0;

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(SEARCH_PARAMS.PAGE_SIZE, String(pageSize));
    newSearchParams.set(SEARCH_PARAMS.PAGE_INDEX, String(pageIndex));
    setSearchParams(newSearchParams);
  }, [pageSize, pageIndex]);

  const incrementPageIndex = () => {
    if (pageIndex * pageSize + pageSize >= totalCount) return;
    setPageIndex((currSize) => currSize + 1);
  };
  const decrementPageIndex = () => {
    if (pageIndex === 0) return;
    setPageIndex((currSize) => currSize - 1);
  };

  return {
    pageIndex,
    pageSize,
    decrementPageIndex,
    incrementPageIndex,
    isNextButtonDisabled,
    isPrevButtonDisabled,
  };
}
