import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <header className="header">
      <Container className={css.headerContainer}>
        <Logo className={css.logoWrap} />
        <NavBar className={css.navBar} />
      </Container>
    </header>
  );
}
