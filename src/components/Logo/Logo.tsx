import LogoIcon from "../../img/logo.svg?react";
import Icon from "../Icon/Icon";

type LogoProps = {
  className?: string;
  logoClass?: string;
};

export default function Logo({ className, logoClass }: LogoProps) {
  return (
    <div className={className}>
      <Icon SvgComponent={LogoIcon} className={logoClass} />
      <p className={className}>LearnLingo</p>
    </div>
  );
}
