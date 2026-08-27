const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

/**
 * Effectue un GET vers l'API Django et retourne la réponse JSON typée.
 * Reste volontairement générique : aucune logique métier ici.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}) sur ${path}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Effectue un POST JSON vers l'API Django et retourne la réponse JSON typée.
 */
export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Erreur API (${response.status}) sur ${path} : ${detail}`);
  }

  return response.json() as Promise<T>;
}
