import { useRoutes } from "react-router";
import { routeConfig } from "../config/routeConfig";

export const AppRouter = () => {
  return useRoutes(routeConfig);
};
