import Container from "../../components/Container/Container";
import HeroBanners from "../../components/HeroBanners/HeroBanners";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <Container>
      <HeroBanners className={css.banners} />
    </Container>
  );
}
