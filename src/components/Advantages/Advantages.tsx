import css from "./Advantages.module.css";

type AdvantagesProps = {
  className: string;
};

export default function Advantages({ className }: AdvantagesProps) {
  return <div className={className}>Advantages</div>;
}
