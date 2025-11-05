import Button from "../Button";
import Icon from "../../Icon/Icon";
import css from "./BtnEye.module.css";

interface BtnEyeProps {
  showPassword: boolean;
  onToggle: () => void;
  className?: string;
}

export default function BtnEye({
  showPassword,
  onToggle,
  className,
  ...props
}: BtnEyeProps) {
  return (
    <Button
      className={className}
      onClick={onToggle}
      aria-label={showPassword ? "hide password" : "show password"}
      title={showPassword ? "hide password" : "show password"}
      {...props}
    >
      <Icon
        iconName={showPassword ? "icon-eye" : "icon-eye-off"}
        className={css.iconEye}
      />
    </Button>
  );
}
