import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { getEvents } from "../../../../entities/event/api/getEvents";
import type { EventItemDto } from "../../../../entities/event/api/types";
import type { EventsContextValue, EventsFilters } from "../model/types";
import { buildEventQuery } from "../../../../features/event-filters/model/buildEventQuery";
import { EventsContext } from "../model/EventsContext";

const formatDateForInput = (date: Date) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createInitialFilters = (): EventsFilters => {
  const now = new Date();

  return {
    event_name: "",
    weapon: "",
    gender: "",
    age: "",
    type: "",
    from: formatDateForInput(new Date(now.getFullYear(), now.getMonth(), 1)),
    to: "",
    serie: [],
  };
};

const createResetFilters = (): EventsFilters => ({
  event_name: "",
  weapon: "",
  gender: "",
  age: "",
  type: "",
  from: "",
  to: "",
  serie: [],
});

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [filters, setFilters] = useState<EventsFilters>(createInitialFilters);
  const [events, setEvents] = useState<EventItemDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const query = useMemo(() => buildEventQuery(filters), [filters]);

  const loadEvents = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getEvents(query, signal);
        setEvents(data);
      } catch (errorValue) {
        if (errorValue instanceof DOMException && errorValue.name === "AbortError") {
          return;
        }
        setError("Не удалось загрузить события");
      } finally {
        setIsLoading(false);
      }
    },
    [query],
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadEvents(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadEvents]);

  const setFilter = useCallback(
    <K extends keyof EventsFilters>(key: K, value: EventsFilters[K]) => {
      setFilters((previousState) => ({
        ...previousState,
        [key]: value,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(createResetFilters());
  }, []);

  const reload = useCallback(async () => {
    await loadEvents();
  }, [loadEvents]);

  const value = useMemo<EventsContextValue>(
    () => ({
      filters,
      events,
      isLoading,
      error,
      setFilter,
      resetFilters,
      reload,
    }),
    [filters, events, isLoading, error, setFilter, resetFilters, reload],
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};
