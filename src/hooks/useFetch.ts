import { useCallback, useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  fetchData: () => void;
}

const apiURl: string = import.meta.env.VITE_API_URL;

export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const token = localStorage.getItem("jwtToken");
    try {
      console.log(apiURl, url);
      const response = await fetch(apiURl + url, {
        headers: {
          Authorization: token ? token : "",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const jsonData = await response.json();

      console.log(jsonData);

      const data: T = jsonData.data;

      setData(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};
