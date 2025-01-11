import { useState, useEffect } from "react";
import { Parent } from "../types";

export function useFetchParents() {
  const [parents, setParents] = useState<Parent[]>([]);

  async function fetchParents() {
    const response = await fetch("http://192.168.0.10:8800/parents");
    const data = await response.json();

    setParents(data);
  }

  useEffect(() => {
    fetchParents();
  }, []);

  return { parents, setParents };
}
