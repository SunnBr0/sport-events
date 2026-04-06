import { createContext, useContext } from "react";
import type { EventsContextValue } from "./types";

export const EventsContext = createContext<EventsContextValue | null>(null);

export const useEventsContext = (): EventsContextValue => {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEventsContext must be used within EventsProvider");
  }

  return context;
};