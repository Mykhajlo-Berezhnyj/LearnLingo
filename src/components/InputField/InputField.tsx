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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  onBlur,
  ...rest
}: InputFieldProps<T>) {
  const registerProps = register(name);

  return (
    <div className={className}>
      <input
        className={error ? css.errorInput : undefined}
        {...registerProps}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...rest}
        onBlur={(e) => {
          registerProps.onBlur(e);
          onBlur?.(e);
        }}
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
