import type { EventsFilters } from "../../../app/providers/events/model/types";

export const buildEventQuery = (filters: EventsFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.event_name.trim()) {
    params.set("event_name", filters.event_name.trim());
  }

  if (filters.weapon) {
    params.set("weapon", filters.weapon);
  }

  if (filters.gender) {
    params.set("gender", filters.gender);
  }

  if (filters.age) {
    params.set("age", filters.age);
  }

  if (filters.type) {
    params.set("type", filters.type);
  }

  if (filters.from) {
    params.set("from", filters.from);
  }

  if (filters.to) {
    params.set("to", filters.to);
  }

  filters.serie.forEach((item) => {
    const trimmedValue = item.trim();

    if (trimmedValue) {
      params.append("serie", trimmedValue);
    }
  });

  return params;
};