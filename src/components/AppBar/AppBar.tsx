import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import AuthMenu from "../AuthMenu/AuthMenu";
import css from "./AppBar.module.css";
import { useAuthStore } from "../zustand/stores/authStore";
import UserMenu from "../UserMenu/UserMenu";

export default function AppBar({ className }: { className?: string }) {
  const { user } = useAuthStore();

  return (
    <header className={className}>
      <Container className={css.headerContainer}>
        <Logo className={css.logoWrap} />
        <NavBar className={css.navBar} />
        {user ? <UserMenu className={css.userMenu} /> : <AuthMenu />}
      </Container>
    </header>
  );
}
