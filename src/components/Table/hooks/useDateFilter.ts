import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { DatePickerProps } from "antd";
import * as dayjs from "dayjs";

const PRODUCT_FILTER_LOCAL_STORAGE_KEY_LE = "lastSeenLe";
const PRODUCT_FILTER_LOCAL_STORAGE_KEY_GE = "lastSeenGe";

export const useDateFilter = (defaultFilter = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = (key: string): string =>
    searchParams.get(key) || defaultFilter;

  const setQueryParam = (key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  const dateFilterLe = getQueryParam(PRODUCT_FILTER_LOCAL_STORAGE_KEY_LE);
  const dateFilterGe = getQueryParam(PRODUCT_FILTER_LOCAL_STORAGE_KEY_GE);

  useEffect(() => {
    setQueryParam(PRODUCT_FILTER_LOCAL_STORAGE_KEY_LE, dateFilterLe);
  }, [dateFilterLe]);

  useEffect(() => {
    setQueryParam(PRODUCT_FILTER_LOCAL_STORAGE_KEY_GE, dateFilterGe);
  }, [dateFilterGe]);

  const disabledLeDate: DatePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs(dateFilterLe);
  };

  const disabledGeDate: DatePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs(dateFilterGe);
  };

  return {
    dateFilterLe,
    dateFilterGe,
    disabledLeDate,
    disabledGeDate,
    setDateFilterLe: (value: string) =>
      setQueryParam(PRODUCT_FILTER_LOCAL_STORAGE_KEY_LE, value),
    setDateFilterGe: (value: string) =>
      setQueryParam(PRODUCT_FILTER_LOCAL_STORAGE_KEY_GE, value),
  };
};
