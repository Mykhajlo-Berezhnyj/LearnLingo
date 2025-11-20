import clsx from "clsx";
import Select from "react-select";
import css from "./FilterSelect.module.css";
import { BtnClearSelect } from "../Button/BtnClearSelect/BtnClearSelect";
import { customSelectStyles } from "./selectStyles";

type FilterSelectProps = {
  label: string;
  name: string;
  disabledValue?: string;
  array: string[];
  value: string;
  className?: string;
  onChange: (value: string) => void;
  error?: string;
  onClear?: () => void;
};

export default function FilterSelect({
  label,
  name,
  disabledValue = "Select...",
  array,
  value,
  className,
  onChange,
  error,
  onClear,
}: FilterSelectProps) {
  const options = array.map((item) => ({
    value: item,
    label: item,
  }));

  const selectedOption = options.find((opt) => opt.value === value) || null;

  {
    return (
      <div className={clsx(css.selectWraper, className)}>
        <label htmlFor={name} className={css.txtLabel}>
          {label}
        </label>
        <Select
          inputId={name}
          name={name}
          className={clsx(css.select)}
          classNamePrefix="react-select"
          styles={customSelectStyles}
          options={options}
          value={selectedOption}
          placeholder={disabledValue}
          onChange={(option) => {
            if (option) onChange(option.value);
          }}
          formatOptionLabel={(option) => {
            if (name === "price") {
              return `${option.value} $`;
            }
            return option.value;
          }}
        />
        {error && <span className={css.error}>{error}</span>}
        {value && onClear && (
          <BtnClearSelect className={css.clearBtn} onClear={onClear} />
        )}
      </div>
    );
  }
}
