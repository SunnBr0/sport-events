import type { RouteObject } from "react-router";
import { RoutePaths } from "./routePaths";
import { MainPage } from "../../../pages/main/ui/MainPage";
import { CalendarEventPage } from "../../../pages/calendar-event/ui/CalendarEventPage";
import { AppLayout } from "../../layouts/AppLayout";

export const routeConfig: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: RoutePaths.main,
        element: <MainPage />,
      },
      {
        path: RoutePaths.calendarEvent,
        element: <CalendarEventPage />,
      },
      {
        path: RoutePaths.fencingOne,
        element: <MainPage />,
      },
      {
        path: RoutePaths.ratings,
        element: <MainPage />,
      },
      {
        path: RoutePaths.results,
        element: <MainPage />,
      },
    ],
  },
];
