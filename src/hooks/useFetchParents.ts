import { Parent } from "../types";
import { useFetch } from "./useFetch";

export function useFetchParents() {
  const { data, fetchData } = useFetch<Parent[]>("/parents");

  const parents = data ? data : [];

  // async function fetchParents() {
  //   const response = await fetch("http://127.0.0.1:8800/parents");
  //   const data = await response.json();

  //   setParents(data);
  // }

  // useEffect(() => {
  //   fetchParents();
  // }, []);

  return { parents, fetchData };
}
