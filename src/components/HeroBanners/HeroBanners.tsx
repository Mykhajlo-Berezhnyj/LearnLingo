import Button from "../Button/Button";
import css from "./HeroBanners.module.css";

type HeroBannersProps = {
  className?: string;
};

export default function HeroBanners({ className }: HeroBannersProps) {
  return (
    <section className={className}>
      <h1>
        Unlock your potential with the best{" "}
        <span className={css["banner-span"]}>language</span> tutors
      </h1>
      <p className='css["banner-text"]'>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <Button>Get started</Button>
    </section>
  );
}
