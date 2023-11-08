import { useEffect, useState } from "react";

export function useGetCard({ marca }) {
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(
          "/api/card?" + new URLSearchParams({ marca })
        );
        const data = await response.json();
        setCard({
          ...data.body,
        });
        setIsLoading(false);

        console.log(data);
      } catch (error) {
        setIsLoading(false);
        setError(error);
        console.log(error);
      }
    };

    fetchCard();
  }, []);
  return { card, isLoading, error };
}
