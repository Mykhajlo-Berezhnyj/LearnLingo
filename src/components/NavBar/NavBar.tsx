import clsx from "clsx";
import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

type NavBarProps = {
  className?: string;
};

export default function NavBar({ className }: NavBarProps) {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={className}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/" className={getActiveLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/teachers" className={getActiveLinkClass}>
            Teachers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
