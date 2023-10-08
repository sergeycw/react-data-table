import { DragEvent, ReactElement } from "react";
import { Checkbox } from "antd";

import { ColumnDef } from "@/types";
import { ArrowIcon } from "@/icons/ArrowIcon";

import * as S from "./styled";

interface TableHeadProps<T> {
  columns: ColumnDef[];
  data: T[];
  withRowSelection?: boolean;
  sortingField: string;
  onSortingChange: (name: string) => void;
  handleDragStart: (
    e: DragEvent<HTMLTableHeaderCellElement>,
    index: number,
  ) => void;
  handleDragOver: (e: DragEvent<HTMLTableHeaderCellElement>) => void;
  handleDrop: (e: DragEvent<HTMLTableHeaderCellElement>, index: number) => void;
  selectedRows: Map<string, boolean>;
  handleSelectAll: (val: string[]) => void;
}

export const TableHead = <T extends Record<string, string>>({
  columns,
  sortingField,
  onSortingChange,
  handleDragStart,
  handleDragOver,
  handleDrop,
  withRowSelection,
  data,
  selectedRows,
  handleSelectAll,
}: TableHeadProps<T>): ReactElement => {
  return (
    <thead>
      <tr>
        {Boolean(withRowSelection && data.length) && (
          <th>
            <Checkbox
              checked={data.length === selectedRows.size}
              onChange={() => handleSelectAll(data.map((r) => r.id))}
            />
          </th>
        )}

        {columns.map(({ name, title, withSorting }, index) => {
          const handleSortingChange = (name: string) => {
            if (!withSorting) return;
            onSortingChange(name);
          };
          return (
            <th
              key={name}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => handleSortingChange(name)}
              className={withSorting ? S.tableHeadCellClassName : undefined}
            >
              {title}
              {withSorting && (
                <>
                  {sortingField === `+${name}` && (
                    <ArrowIcon className={S.iconClassName} />
                  )}
                  {sortingField === `-${name}` && (
                    <ArrowIcon direction={"down"} className={S.iconClassName} />
                  )}
                </>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
