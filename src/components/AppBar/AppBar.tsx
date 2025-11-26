import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import AuthMenu from "../AuthMenu/AuthMenu";
import css from "./AppBar.module.css";
import { useAuthStore } from "../zustand/stores/authStore";
import UserMenu from "../UserMenu/UserMenu";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

type AppBarProps = {
  className?: string;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export default function AppBar({ className, theme, setTheme }: AppBarProps) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function Wrapper({ condition, wrapper, children }) {
    return condition ? wrapper(children) : children;
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className={className}>
      <Container className={css.headerContainer}>
        <Logo className={css.logoWrap} />
        <Button className={css.burgerMenu} onClick={toggleMenu}>
          <Icon
            iconName={isOpen ? "close-x-icon" : "burger-icon"}
            size={isOpen ? 20 : 24}
            className={css.iconBurger}
          />
        </Button>
        <Wrapper
          condition={isOpen}
          wrapper={(children) => (
            <div className={clsx(css.wrapperBurger, isOpen && css.isOpen)}>
              {children}
            </div>
          )}
        >
          <NavBar
            className={clsx(css.navBar, isOpen && css.open)}
            onCloseMenu={handleCloseMenu}
          />
          {user ? (
            <div className={clsx(css.wrapMenu, isOpen && css.open)}>
              <UserMenu
                className={clsx(css.userMenu, isOpen && css.open)}
                onCloseMenu={handleCloseMenu}
              />
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          ) : (
            <div className={clsx(css.wrapMenu, isOpen && css.open)}>
              <AuthMenu
                className={clsx(css.userMenu, isOpen && css.open)}
                onCloseMenu={handleCloseMenu}
              />
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          )}
        </Wrapper>
      </Container>
    </header>
  );
}
