import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { Input, Select, DatePicker, DatePickerProps } from "antd";

import * as S from "./styled";

export const PRODUCTS = {
  IDEA: "II",
  WEB_STORM: "WS",
  PY_CHARM: "PC",
  ALL: "No product filter",
} as const;

const productSelectOptions = Object.values(PRODUCTS).map((product) => ({
  value: product === PRODUCTS.ALL ? "" : product,
  label: product,
}));

interface TableFiltersProps {
  inputValue: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  productFilter: string;
  onProductChange: (value: string) => void;
  dateFilterGe: string;
  onGeDateChange: DatePickerProps["onChange"];
  dateFilterLe: string;
  onLeDateChange: DatePickerProps["onChange"];
  disabledLeDate: (date: dayjs.Dayjs) => boolean;
  disabledGeDate: (date: dayjs.Dayjs) => boolean;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  inputValue,
  onInputChange,
  productFilter,
  onProductChange,
  dateFilterGe,
  onGeDateChange,
  dateFilterLe,
  onLeDateChange,
  disabledGeDate,
  disabledLeDate,
}) => {
  return (
    <S.FlexRow>
      <div>
        <Input
          size="large"
          value={inputValue}
          placeholder={"Search by license ID or assignee"}
          onChange={onInputChange}
        />
      </div>
      <Select
        placeholder={"Select a product"}
        value={productFilter}
        style={{ width: "180px" }}
        size={"large"}
        options={productSelectOptions}
        onChange={onProductChange}
      />
      <S.RangeRow>
        <div>Last Seen:</div>
        <DatePicker
          inputReadOnly
          disabledDate={disabledLeDate}
          showTime
          value={dateFilterGe ? dayjs(dateFilterGe) : undefined}
          size={"large"}
          onChange={onGeDateChange}
        />
        <div>...</div>
        <DatePicker
          inputReadOnly
          disabledDate={disabledGeDate}
          showTime
          value={dateFilterLe ? dayjs(dateFilterLe) : undefined}
          size={"large"}
          onChange={onLeDateChange}
        />
      </S.RangeRow>
    </S.FlexRow>
  );
};
