import css from "./InputField.module.css";
import type { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function InputField<T extends FieldValues>({
  name,
  register,
  error,
  type = "text",
  placeholder,
  autoComplete,
  children,
  className,
  ...rest
}: InputFieldProps<T>) {
  return (
    <div className={className}>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...rest}
      />
      {error && (
        <span role="alert" className={css.error}>
          {error}
        </span>
      )}
      {children}
    </div>
  );
}
