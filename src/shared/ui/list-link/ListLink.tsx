import type { ReactNode } from "react";
import { NavLink } from "react-router";
type ListLinkProps = {
  to: string;
  children: ReactNode;
  end?: boolean;
};
export const ListLink = ({ to, children, end = false }: ListLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "font-['IBM_Plex_Sans'] text-[16px] leading-[100%] tracking-[0] align-middle transition-colors duration-200",
          isActive
            ? "font-semibold text-link-nav-active"
            : "font-normal text-link-nav hover:text-link-hover",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
};
