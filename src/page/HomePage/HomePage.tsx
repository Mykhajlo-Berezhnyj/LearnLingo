import Container from "../../components/Container/Container";
import HeroBanners from "../../components/HeroBanners/HeroBanners";
import HeroImg from "../../components/HeroImg/HeroImg";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className="css.hero">
      <Container className={css["hero-container"]}>
        <HeroBanners className={css.banners} />
        <HeroImg className={css.heroImg} />
      </Container>
    </section>
  );
}
