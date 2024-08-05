import { Planet } from "@/types";
import { useEffect, useState } from "react";

export const usePlanet = (id: number | null) => {
  const [data, setData] = useState<Planet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://swapi.dev/api/planets/${id}`);
        const result: Planet = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  return { data, loading, error };
};
