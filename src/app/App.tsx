import { BrowserRouter } from "react-router";
import { AppRouter } from "./router/ui/AppRouter";
import { EventsProvider } from "./providers/events/ui/EventsProvider";

export const App = () => {
  return (
    <BrowserRouter>
      <EventsProvider>
        <AppRouter />
      </EventsProvider>
    </BrowserRouter>
  );
};
