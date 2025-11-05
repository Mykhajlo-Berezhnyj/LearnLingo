import { useState } from "react";
import type { UseFormRegister, Path, FieldValues } from "react-hook-form";
import BtnEye from "../Button/BtnEye/BtnEye";
import css from "../InputField/InputField.module.css";

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  placeholder: string;
  autoComplete?: string;
  className?: string;
}

export default function PasswordField<T extends FieldValues>({
  name,
  register,
  error,
  placeholder,
  autoComplete,
  className,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  function toggle() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={className}>
      <input
        className={error ? css.errorInput : undefined}
        {...register(name)}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label="input password"
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      <BtnEye
        showPassword={showPassword}
        onToggle={toggle}
        className={css.btnEye}
      />
      {error && (
        <span role="alert" id={`${name}-error`} className={css.error}>
          {error}
        </span>
      )}
    </div>
  );
}
