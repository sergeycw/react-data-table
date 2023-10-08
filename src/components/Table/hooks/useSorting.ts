import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const useSorting = (defaultField = "+id") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortingField, setSortingField] = useState(
    () => searchParams.get("sortBy") || defaultField,
  );

  const handleSortingChange = (field: string) => {
    if (`+${field}` === sortingField) {
      setSortingField(`-${field}`);
    } else setSortingField(`+${field}`);
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortBy", sortingField);

    setSearchParams(newSearchParams);
  }, [sortingField]);

  return {
    sortingField,
    handleSortingChange,
  };
};
