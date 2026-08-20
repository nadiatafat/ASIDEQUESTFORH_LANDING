import { useHelloMessage } from "./useHelloMessage";

export function HelloMessage() {
  const { message, isLoading, error } = useHelloMessage();

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Impossible de contacter le backend ({error})</p>;
  }

  return <p>{message}</p>;
}
