import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

const DEBOUNCE_TIMEOUT = 300;

export const useSearch = (query = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(
    () => searchParams.get("search") || query,
  );

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || query,
  );

  const debouncedSearch = useCallback(
    debounce(setSearchQuery, DEBOUNCE_TIMEOUT),
    [],
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      newSearchParams.set("search", searchQuery);
    } else {
      newSearchParams.delete("search");
    }
    setSearchParams(newSearchParams);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery: debouncedSearch,
    setInputValue,
    inputValue,
  };
};
