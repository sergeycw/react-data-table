import { ChangeEvent, useEffect, useState } from "react";
import { Button, Select, DatePickerProps } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSWRConfig } from "swr";

import { BaseTable } from "./components/BaseTable";
import { Pagination } from "./components/Pagination";
import { AssignLicenseDialog } from "./components/AssignLicenseDialog";
import { TableFilters } from "@/components/Table/components/TableFilters/TableFilters";
import { useServerPagination } from "@/components/Table/hooks/useServerPagination";
import { useSorting } from "@/components/Table/hooks/useSorting";
import { useSearch } from "@/components/Table/hooks/useSearch";
import { useProductFilter } from "@/components/Table/hooks/useProductFilter";
import { useColumnsFilter } from "@/components/Table/hooks/useColumnsFilter";
import { useDateFilter } from "@/components/Table/hooks/useDateFilter";
import { useLicense } from "@/api/asyncHooks/useLicense";

import * as S from "./styled";

const columnsDef = [
  {
    name: "id",
    title: "License ID",
    withSorting: true,
  },
  {
    name: "product",
    title: "Product",
    withSorting: true,
  },
  {
    name: "assignTo",
    title: "Assign to",
    withSorting: false,
  },
  {
    name: "lastSeen",
    title: "Last seen",
    withSorting: true,
    cellRenderer: (value?: string) => {
      if (!value) return "";
      const date = new Date(value);
      return date.toLocaleDateString();
    },
  },
];

const columnsSelectOptions = columnsDef.map(({ name, title }) => ({
  label: title,
  value: name,
}));

export function Table() {
  const [count, setCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectChange = (options: string[]) => {
    if (options.length < 1) return;
    setColumnsFilter(options);
  };

  const {
    pageIndex,
    pageSize,
    decrementPageIndex,
    incrementPageIndex,
    isNextButtonDisabled,
    isPrevButtonDisabled,
  } = useServerPagination(count);

  const columnsNames = columnsDef.map((col) => col.name);

  const { handleSortingChange, sortingField } = useSorting();
  const { searchQuery, setSearchQuery, setInputValue, inputValue } =
    useSearch();
  const { productFilter, setProductFilter } = useProductFilter();
  const { columnsFilter, setColumnsFilter } = useColumnsFilter(columnsNames);

  const {
    dateFilterLe,
    setDateFilterLe,
    setDateFilterGe,
    dateFilterGe,
    disabledGeDate,
    disabledLeDate,
  } = useDateFilter();

  const { cache } = useSWRConfig();

  const getLastSavedDataInCache = () => {
    const cacheKeys = [...cache.keys()];
    const lastSavedKey = cacheKeys[cacheKeys.length - 1];
    return cache.get(lastSavedKey)?.data?.licenses;
  };

  const { licenses, totalCount, mutate, isLoading } = useLicense({
    pageIndex,
    pageSize,
    sorting: sortingField,
    search: searchQuery,
    product: productFilter,
    lastSeenLe: dateFilterLe,
    lastSeenGe: dateFilterGe,
  });

  useEffect(() => {
    if (!totalCount) return;
    setCount(Number(totalCount));
  }, [totalCount]);

  const handleProductChange = (value: string) => {
    setProductFilter(value);
  };

  const handleLeDateChange: DatePickerProps["onChange"] = (date) => {
    if (!date) setDateFilterLe("");
    else setDateFilterLe(date.toISOString());
  };

  const handleGeDateChange: DatePickerProps["onChange"] = (date) => {
    if (!date) setDateFilterGe("");
    else setDateFilterGe(date.toISOString());
  };

  const [selectedRows, setSelectedRows] = useState<Map<string, boolean>>(
    new Map(),
  );

  const handleCheckboxClick = (value: string) => {
    const newSelectedRows = new Map(selectedRows);

    if (newSelectedRows.has(value)) {
      newSelectedRows.delete(value);
    } else {
      newSelectedRows.set(value, true);
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = (values: string[]) => {
    if (selectedRows.size === values.length) {
      setSelectedRows(new Map());
    } else {
      const newSelectedRows = new Map(selectedRows);
      values.forEach((val) => newSelectedRows.set(val, true));
      setSelectedRows(newSelectedRows);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleDialogClose = () => {
    setSelectedRows(new Map());
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const handleLicenseAssigned = () => {
    mutate();
  };

  const data =
    licenses?.map(({ id, lastSeen, product, assignedTo }) => ({
      id,
      product,
      assignTo: assignedTo,
      lastSeen,
    })) ||
    getLastSavedDataInCache() ||
    [];

  return (
    <S.TableWrapper>
      <ToastContainer />
      <AssignLicenseDialog
        onClose={handleDialogClose}
        onLicenseAssigned={handleLicenseAssigned}
        isOpen={isDialogOpen}
        selectedRows={selectedRows}
      />
      <TableFilters
        disabledLeDate={disabledLeDate}
        disabledGeDate={disabledGeDate}
        inputValue={inputValue}
        productFilter={productFilter}
        dateFilterGe={dateFilterGe}
        dateFilterLe={dateFilterLe}
        onProductChange={handleProductChange}
        onGeDateChange={handleGeDateChange}
        onLeDateChange={handleLeDateChange}
        onInputChange={handleInputChange}
      />
      <S.FlexRow>
        <Button
          size={"large"}
          type={"primary"}
          disabled={!selectedRows.size}
          onClick={openDialog}
        >
          {"Assign License(s)"}
        </Button>
        <Select
          className={S.hideStyles}
          style={{ width: "150px" }}
          mode="multiple"
          showSearch={false}
          options={columnsSelectOptions}
          onChange={handleSelectChange}
          value={columnsFilter}
          size={"large"}
          maxTagCount={0}
          maxTagPlaceholder={() => "Columns"}
        />
      </S.FlexRow>
      <BaseTable
        isLoading={isLoading}
        withRowSelection
        sortingField={sortingField}
        onSortingChange={handleSortingChange}
        columnsDef={columnsDef.filter((col) =>
          columnsFilter.includes(col.name),
        )}
        data={data}
        handleCheckboxClick={handleCheckboxClick}
        handleSelectAll={handleSelectAll}
        selectedRows={selectedRows}
      />
      <S.FlexRow>
        <div>{`${selectedRows.size} of ${pageSize} rows selected`}</div>
        <Pagination
          onNextButtonClick={incrementPageIndex}
          onPrevButtonClick={decrementPageIndex}
          isPrevButtonDisabled={isPrevButtonDisabled}
          isNextButtonDisabled={isNextButtonDisabled}
        />
      </S.FlexRow>
    </S.TableWrapper>
  );
}
