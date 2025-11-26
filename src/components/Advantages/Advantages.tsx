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
          x="1.5"
          y="1.5"
          width="98.5%"
          height="98.5%"
          rx="30"
          ry="30"
          fill="none"
          vectorEffect="non-scaling-stroke"
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
