import { useState, useEffect } from "react";

type Teen = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
};

export default function useTeens() {
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
