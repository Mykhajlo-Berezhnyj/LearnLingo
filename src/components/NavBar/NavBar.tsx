import { clsx } from "clsx";
import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../zustand/stores/authStore";

type NavBarProps = {
  className?: string;
};

export default function NavBar({ className }: NavBarProps) {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };
  const { user } = useAuthStore();

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
        {user && (
          <li className={css.navItem}>
            <NavLink to="/favorites" className={getActiveLinkClass}>
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
