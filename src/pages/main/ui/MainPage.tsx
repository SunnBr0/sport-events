import { RoutePaths } from "../../../app/router/config/routePaths";
import { ListLink } from "../../../shared/ui/list-link/ListLink";

export const MainPage = () => {
  return (
    <section>
      <ListLink to={RoutePaths.calendarEvent}>
        <div className="flex justify-center mx-60 mt-10 py-4 bg-blue-800 rounded-4xl">
          <p>Календарь</p>
        </div>
      </ListLink>
    </section>
  );
};
