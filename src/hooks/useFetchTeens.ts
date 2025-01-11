import { useState, useEffect } from "react";
import { Teen } from "../types";

export default function useFetchTeens() {
  const [teens, setTeens] = useState<Teen[]>([]);

  async function fetchTeens() {
    const response = await fetch("http://192.168.0.10:8800/teens");
    const data = await response.json();

    setTeens(data);
  }

  useEffect(() => {
    fetchTeens();
  }, []);

  return { teens, setTeens };
}
