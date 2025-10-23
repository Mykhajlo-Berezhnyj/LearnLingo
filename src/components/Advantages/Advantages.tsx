import css from "./Advantages.module.css";
import { advantages } from "../db/advantages";

type AdvantagesProps = {
  className: string;
};

export default function Advantages({ className }: AdvantagesProps) {
  return (
    <div className={className}>
      <svg
        className={css.dashedBorder}
        viewBox="0 0 1312 116"
        preserveAspectRatio="none"
      >
        <rect
          x="0.75"
          y="0.75"
          width="1310.5"
          height="114.5"
          rx="30"
          ry="30"
          fill="none"
        />
      </svg>
      <ul className={css.list}>
        {advantages.map((a, index) => (
          <li className={css.item} key={index}>
            <h2 className={css.dataH2}>{a.data}</h2>
            <p className={css.label}>{a.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
