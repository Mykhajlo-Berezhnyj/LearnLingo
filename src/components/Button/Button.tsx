import clsx from "clsx";
import css from "./Button.module.css";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: "transparent" | "btnPrimary";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type = "button",
  color = "transparent",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.button, css[color] ?? css.transparent, className)}
      {...props}
    >
      {children}
    </button>
  );
}
