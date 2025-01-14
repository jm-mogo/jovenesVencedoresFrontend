import { useState, useEffect } from "react";
import { Teen } from "../types";

export default function useFetchTeen(id: string | undefined) {
  const [teen, setTeen] = useState<Teen>();

  async function fetchTeen() {
    const response = await fetch(`http://127.0.0.1:8800/teens/${id}`);
    const data: Teen = await response.json();
    setTeen(data);
  }

  useEffect(() => {
    fetchTeen();
  }, []);

  return { teen, setTeen };
}
