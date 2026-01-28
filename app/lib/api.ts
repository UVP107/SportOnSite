export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-cache",  // no cache = real time data
  });

  if (!res.ok) {
    let errorMessage = `API Error (${res.status}): ${endpoint}`;

    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.error("Failed to parse error JSON", e);
    }
    console.error("FetchAPI failure:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  }

  return res.json();
}

export function getImageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}
