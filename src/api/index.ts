import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { License } from "@/types";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const licenseFetcher = async ([url, params]: [
  string,
  Record<string, string | undefined | number>,
]) => {
  try {
    const res: AxiosResponse<License[]> = await api.get(url, { params });
    const totalCount: string | undefined = res.headers["x-total-count"];

    if (!totalCount) {
      throw new Error("Total count not found in response headers");
    }

    return { licenses: res.data, totalCount };
  } catch (error) {
    toast("Oops! Something went wrong.", { type: "error" });
    console.error("Fetch license error:", error);
  }
};

export async function assigneeMutation(
  url: string,
  { arg }: { arg: { ids: string[]; assignTo: string } },
) {
  try {
    return await api.post(url, arg);
  } catch (error) {
    toast("Oops! Something went wrong.", { type: "error" });
  }
}
