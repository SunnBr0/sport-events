import type { EventItemDto, EventAge, EventGender, EventWeapon } from "../../../../entities/event/api/types";

export type EventType = "" | "I" | "T";

export interface EventsFilters {
  event_name: string;
  weapon: "" | EventWeapon;
  gender: "" | EventGender;
  age: "" | EventAge;
  type: EventType;
  from: string;
  to: string;
  serie: string[];
}

export interface EventsContextValue {
  filters: EventsFilters;
  events: EventItemDto[];
  isLoading: boolean;
  error: string;
  setFilter: <K extends keyof EventsFilters>(
    key: K,
    value: EventsFilters[K],
  ) => void;
  resetFilters: () => void;
  reload: () => Promise<void>;
}