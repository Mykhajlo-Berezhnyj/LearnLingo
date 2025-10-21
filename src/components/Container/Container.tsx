import clsx from "clsx";
import css from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}
