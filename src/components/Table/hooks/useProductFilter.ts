import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PRODUCT_FILTER_LOCAL_STORAGE_KEY = "product";

export const useProductFilter = (defaultProduct = "") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productFilter, setProductFilter] = useState(
    () => searchParams.get(PRODUCT_FILTER_LOCAL_STORAGE_KEY) || defaultProduct,
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (productFilter) {
      newSearchParams.set(PRODUCT_FILTER_LOCAL_STORAGE_KEY, productFilter);
    } else {
      newSearchParams.delete(PRODUCT_FILTER_LOCAL_STORAGE_KEY);
    }
    setSearchParams(newSearchParams);
  }, [productFilter]);

  return {
    productFilter,
    setProductFilter,
  };
};
