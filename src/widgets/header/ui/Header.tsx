import { RoutePaths } from "../../../app/router/config/routePaths";
import { ListLink } from "../../../shared/ui/list-link/ListLink";

export const Header = () => {
  return (
    <header>
      <section className="flex justify-between mx-6 py-4.5">
        <div className="flex  gap-9.5">
          <figure>
            <img src="./icon-website.svg" alt="" />
          </figure>
          <nav className="flex gap-8.75  items-center">
            <ListLink to={RoutePaths.calendarEvent} end>
              Календарь
            </ListLink>
            <ListLink to={RoutePaths.results}>Результаты</ListLink>
            <ListLink to={RoutePaths.ratings}>Рейтинги</ListLink>
            <ListLink to={RoutePaths.fencingOne}>FencingOne</ListLink>
          </nav>
        </div>
        <button>
          <figure>
            <img src="./login-user.svg" alt="" />
          </figure>
        </button>
      </section>
    </header>
  );
};
