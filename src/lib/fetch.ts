type FetcherOptions = {
  path: string;
  query?: Record<string, string | number | boolean | null | undefined>;
  header?: Record<string, string> | Headers;
  body?: unknown;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  select?: (data: unknown) => unknown;
};

function buildUrl(path: string, query?: FetcherOptions["query"]): URL {
  const url = new URL(path, window.location.origin);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url;
}

function prepareBody(body: unknown, headers: Headers): BodyInit | undefined {
  if (body === undefined) {
    return;
  }

  if (body instanceof FormData || typeof body === "string") {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

export async function fetcher<T>({
  path,
  query,
  header,
  body,
  method,
  select,
}: FetcherOptions): Promise<T> {
  const url = buildUrl(path, query);
  const headers = new Headers(header);
  const requestBody = prepareBody(body, headers);

  const options: RequestInit = {
    method: method ?? (body !== undefined ? "POST" : "GET"),
    headers,
  };

  if (requestBody !== undefined) {
    options.body = requestBody;
  }

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as T;
  return select ? (select(data) as T) : data;
}
