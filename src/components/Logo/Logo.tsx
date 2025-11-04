import LogoIcon from "../../../public/logo.svg?react";
import Icon from "../Icon/Icon";
import css from "./Logo.module.css";

export default function Logo({ className }: { className: string }) {
  return (
    <div className={className}>
      <Icon SvgComponent={LogoIcon} size={28} />
      <p className={css.logoText}>LearnLingo</p>
    </div>
  );
}
