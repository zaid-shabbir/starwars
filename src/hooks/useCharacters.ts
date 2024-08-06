import { ApiResponse, Character } from "@/types";
import { useState, useEffect } from "react";

export const useCharacters = (page: number, search: string | null) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getParams = (pageNo: number, searchVal: string | null) => {
    let params = new URLSearchParams();
    if (searchVal) {
      params.append("search", searchVal);
    }
    if (pageNo) {
      params.append("page", pageNo.toString());
    }
    return `?${params.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = getParams(page, search);
        const response = await fetch(`https://swapi.dev/api/people/${params}`);
        const result: ApiResponse = await response.json();
        const resultsWithImage = (result.results as Character[]).map(
          (character: Character, index: number) => ({
            ...character,
            imageUrl: `https://picsum.photos/seed/${encodeURIComponent(
              character.name
            )}/230/250`
          })
        );
        setData({
          ...result,
          results: resultsWithImage
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  return { data, loading, error };
};
