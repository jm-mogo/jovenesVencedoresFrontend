import { Parent } from "../types";
import { useFetch } from "./useFetch";

export function useFetchParents() {
  const { data, fetchData } = useFetch<Parent[]>("/parents");

  const parents = data ? data : [];

  return { parents, fetchData };
}
