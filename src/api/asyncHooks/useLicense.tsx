import useSWR from "swr";

import { licenseFetcher } from "@/api";

export type LicenseSearchParams = {
  pageIndex?: number;
  pageSize?: number;
  sorting?: string;
  search?: string;
  product?: string;
  lastSeenLe?: string;
  lastSeenGe?: string;
};

export function useLicense({
  pageIndex = 0,
  pageSize = Number.MAX_SAFE_INTEGER,
  sorting = "-id",
  search = "",
  product = "",
  lastSeenLe = "",
  lastSeenGe = "",
}: LicenseSearchParams) {
  const { data, error, isLoading, mutate } = useSWR(
    [
      "/api/licenses",
      {
        pageIndex,
        pageSize,
        sortBy: sorting || undefined,
        search: search || undefined,
        product: product || undefined,
        lastSeenLe: lastSeenLe || undefined,
        lastSeenGe: lastSeenGe || undefined,
      },
    ],
    licenseFetcher,
  );

  return {
    licenses: data?.licenses,
    totalCount: data?.totalCount,
    isLoading,
    hasError: error,
    mutate,
  };
}
