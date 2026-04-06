import { apiRequest } from "../../../shared/api/base";
import type { EventItemDto } from "./types";

export const getEvents = (params: URLSearchParams, signal?: AbortSignal) => {
  return apiRequest<EventItemDto[]>({
    path: "/events",
    query: params,
    method: "GET",
    signal,
  });
};
