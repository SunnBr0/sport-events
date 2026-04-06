import { env } from "../config/env";

const buildBasicAuthHeader = (login: string, password: string): string => {
  return `Basic ${btoa(`${login}:${password}`)}`;
};

type RequestParams = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  query?: URLSearchParams;
  signal?: AbortSignal;
};

export const apiRequest = async <T>({
  path,
  method,
  query,
  signal,
}: RequestParams): Promise<T> => {
  const url = new URL(`/restapi${path}`, env.apiBaseUrl);

  if (query) {
    url.search = query.toString();
  }

  const response = await fetch(url.toString(), {
    method,
    signal,
    headers: {
      Authorization: buildBasicAuthHeader(env.apiLogin, env.apiPassword),
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
