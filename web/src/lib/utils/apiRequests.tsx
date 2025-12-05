async function apiRequest<T>(url: string, method: string, body?: any, timeout: number = 50000): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);
    clearTimeout(id);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
}

/**
 * Generic POST request wrapper
 */
export async function postAction<T = any>(url: string, body: any, timeout: number = 50000): Promise<T> {
  return apiRequest<T>(url, "POST", body, timeout);
}

/**
 * Generic PATCH request wrapper
 */
export async function patchAction<T = any>(url: string, body: any, timeout: number = 50000): Promise<T> {
  return apiRequest<T>(url, "PATCH", body, timeout);
}

/**
 * Generic PUT request wrapper
 */
export async function putAction<T = any>(url: string, body: any, timeout: number = 50000): Promise<T> {
  return apiRequest<T>(url, "PUT", body, timeout);
}

/**
 * Generic GET request wrapper
 */
export async function getAction<T = any>(url: string, timeout: number = 50000): Promise<T> {
  return apiRequest<T>(url, "GET", undefined, timeout);
}

/**
 * Generic DELETE request wrapper
 */
export async function deleteAction<T = any>(url: string, timeout: number = 50000): Promise<T> {
  return apiRequest<T>(url, "DELETE", undefined, timeout);
}
