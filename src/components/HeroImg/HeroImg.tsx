import Imac from "../Imac/Imac";
import css from "./HeroImg.module.css";
import heroImg1x from "../../img/heroImg.webp";
import heroImg2x from "../../img/heroImg@2.webp";
import clsx from "clsx";

type HeroImgProps = {
  className: string;
};

export default function HeroImg({ className }: HeroImgProps) {
  return (
    <div className={clsx(css.imgWrapper, className)}>
      <img
        className={css.imgUnion}
        src={heroImg1x}
        srcSet={`${heroImg1x} 1x, ${heroImg2x} 2x`}
        alt="Hero img"
      />
      <Imac className={css.imgImac} />
    </div>
  );
}
