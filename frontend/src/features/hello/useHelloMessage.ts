import { useEffect, useState } from "react";
import { apiGet } from "../../api/client";

interface HelloResponse {
  message: string;
}

interface UseHelloMessageResult {
  message: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Récupère la phrase à afficher depuis l'endpoint /api/hello/ du backend.
 */
export function useHelloMessage(): UseHelloMessageResult {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    apiGet<HelloResponse>("/api/hello/")
      .then((data) => {
        if (isMounted) {
          setMessage(data.message);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { message, isLoading, error };
}
