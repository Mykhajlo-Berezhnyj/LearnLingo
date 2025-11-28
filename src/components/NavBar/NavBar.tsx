import { clsx } from "clsx";
import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../zustand/stores/authStore";
import { teachersStore } from "../zustand/stores/teachers";

type NavBarProps = {
  className?: string;
  onCloseMenu?: () => void;
};

export default function NavBar({ className, onCloseMenu }: NavBarProps) {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };
  const { user } = useAuthStore();
  const { resetTeachers, resetFavorites } = teachersStore();

  return (
    <nav className={className}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink
            to="/"
            className={getActiveLinkClass}
            onClick={() => onCloseMenu()}
          >
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            to="/teachers"
            className={getActiveLinkClass}
            onClick={() => {
              onCloseMenu();
              resetTeachers();
            }}
          >
            Teachers
          </NavLink>
        </li>
        {user && (
          <li className={css.navItem}>
            <NavLink
              to="/favorites"
              className={getActiveLinkClass}
              onClick={() => {
                onCloseMenu();
                resetFavorites();
              }}
            >
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
