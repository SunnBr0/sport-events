import { EventFilters } from "../../../features/event-filters/ui/EventFilters";
import { EventsTable } from "../../../widgets/events-table/ui/EventsTable";

export const CalendarEventPage = () => {
  return (
    <section className="px-6 py-6">
      <EventFilters />
      <EventsTable />
    </section>
  );
};