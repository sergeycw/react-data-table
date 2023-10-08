import { useLocalStorage } from "@/components/Table/hooks/useLocalStorage";

const COLUMNS_FILTER_LOCAL_STORAGE_KEY = "productFilter";

export const useColumnsFilter = (defaultColumns: string[]) => {
  const [columnsFilter, setColumnsFilter] = useLocalStorage<string[]>(
    COLUMNS_FILTER_LOCAL_STORAGE_KEY,
    defaultColumns,
  );

  return {
    columnsFilter,
    setColumnsFilter,
  };
};
