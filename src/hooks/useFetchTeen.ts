import { useState, useEffect } from "react";
import { Teen } from "../types";

export default function useFetchTeen(id: string | undefined) {
  const [teen, setTeen] = useState<Teen>();

  async function fetchTeen() {
    const response = await fetch(`http://192.168.0.10:8800/teens/${id}`);
    const data: Teen = await response.json();
    setTeen(data);
  }

  useEffect(() => {
    fetchTeen();
  }, []);

  return { teen, setTeen };
}
