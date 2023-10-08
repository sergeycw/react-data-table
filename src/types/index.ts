import { ReactElement } from "react";

export type License = {
  id: string;
  lastSeen: string;
  product: "II" | "WS" | "PC";
  assignedTo: string;
};

export type SortBy =
  | "+id"
  | "-id"
  | "+assignedTo"
  | "-assignedTo"
  | "+product"
  | "-product"
  | "+lastSeen"
  | "-lastSeen";

export type ColumnDef = {
  name: string;
  title: string;
  withSorting: boolean;
  cellRenderer?: (value: string) => string | ReactElement;
  onRowSelected?: (value: string) => string;
};
