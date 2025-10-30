import clsx from "clsx";
import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./BtnLogInOut.module.css";

interface BtnLogInOutProps {
  btnLabel?: string;
  classNameBtn?: string;
  classNameIcon?: string;
  iconName?: string;
  iconSize?: number;
  iconPosition?: "left" | "right";
  onClick: () => void;
}

export default function BtnLogInOut({
  btnLabel = "Log In",
  classNameBtn,
  classNameIcon = css.iconLogin,
  iconName = "log-in",
  iconSize = 20,
  iconPosition,
  onClick,
}: BtnLogInOutProps) {
  return (
    <Button
      className={clsx(css.btnLogIn, classNameBtn, {
        [css.reverse]: iconPosition === "right",
      })}
      aria-label={`button ${btnLabel}`}
      onClick={onClick}
    >
      <Icon className={classNameIcon} iconName={iconName} size={iconSize} />
      {btnLabel}
    </Button>
  );
}
