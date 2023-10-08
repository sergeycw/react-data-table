import { ReactElement } from "react";
import { Checkbox } from "antd";

import { ColumnDef } from "@/types";

import * as S from "./styled";

interface TableBodyProps<T> {
  columns: ColumnDef[];
  withRowSelection?: boolean;
  data: T[];
  selectedRows: Map<string, boolean>;
  handleCheckboxClick: (val: string) => void;
  isLoading: boolean;
}

export const TableBody = <T extends Record<string, string>>({
  columns,
  data,
  withRowSelection,
  selectedRows,
  handleCheckboxClick,
  isLoading,
}: TableBodyProps<T>): ReactElement => {
  if (!data.length && !isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={withRowSelection ? columns.length + 1 : columns.length}>
            No data found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          className={isLoading ? S.loadingRowClassName : undefined}
          key={rowIndex}
        >
          {withRowSelection && (
            <S.CheckBoxCell>
              <Checkbox
                key={row.id}
                onChange={() => {
                  handleCheckboxClick(row.id);
                }}
                checked={selectedRows.has(row.id)}
              />
            </S.CheckBoxCell>
          )}
          {columns.map(({ name, cellRenderer }) => {
            const cellData = row[name];
            return (
              <td key={name}>
                {cellRenderer ? cellRenderer(cellData) : cellData}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
