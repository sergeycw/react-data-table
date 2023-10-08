import { FC } from "react";

import { TableHead } from "./components/TableHead";
import { TableBody } from "./components/TableBody";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { ColumnDef } from "@/types";

import * as S from "./styled";

type Data = {
  [key: string]: string;
};

interface DataTableProps {
  data: Data[];
  columnsDef: ColumnDef[];
  sortingField: string;
  onSortingChange: (field: string) => void;
  withRowSelection?: boolean;
  isLoading: boolean;
  selectedRows: Map<string, boolean>;
  handleSelectAll: (val: string[]) => void;
  handleCheckboxClick: (val: string) => void;
}

export const BaseTable: FC<DataTableProps> = ({
  columnsDef,
  data,
  onSortingChange,
  sortingField,
  withRowSelection,
  selectedRows,
  handleCheckboxClick,
  handleSelectAll,
  isLoading,
}) => {
  const orderedColumns = columnsDef.map((col) => col.name);
  const { handleDrop, handleDragOver, handleDragStart, columns } =
    useDragAndDrop(orderedColumns);

  const sortedColumns = sortColumnsByOrder(columnsDef, columns);

  return (
    <S.Table>
      <TableHead
        data={data}
        withRowSelection={withRowSelection}
        columns={sortedColumns}
        sortingField={sortingField}
        onSortingChange={onSortingChange}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleSelectAll={handleSelectAll}
        selectedRows={selectedRows}
      />
      <TableBody
        isLoading={isLoading}
        selectedRows={selectedRows}
        handleCheckboxClick={handleCheckboxClick}
        withRowSelection={withRowSelection}
        columns={sortedColumns}
        data={data}
      />
    </S.Table>
  );
};

function sortColumnsByOrder(
  arrayToSort: ColumnDef[],
  sortOrder: string[],
): ColumnDef[] {
  return arrayToSort.sort((a, b) => {
    const indexA = sortOrder.indexOf(a.name);
    const indexB = sortOrder.indexOf(b.name);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}
