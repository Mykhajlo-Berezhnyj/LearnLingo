import clsx from "clsx";
import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./BtnClearSelect.module.css";

interface BtnClearSelectProps {
  className?: string;
  onClear: () => void;
}

export function BtnClearSelect({ className, onClear }: BtnClearSelectProps) {
  return (
    <Button className={clsx(css.btnClearSelect, className)} onClick={onClear}>
      <Icon iconName="close-x-icon" size={20} className={css.iconClear} />
    </Button>
  );
}
