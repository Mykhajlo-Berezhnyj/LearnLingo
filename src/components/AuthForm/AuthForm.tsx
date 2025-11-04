import { useForm, type Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AuthForm.module.css";
import { useState } from "react";
import type { ObjectSchema, InferType, AnyObject } from "yup";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import PasswordField from "../PasswordField/PasswordField";
import toast from "react-hot-toast";
import type { User } from "firebase/auth";
import Icon from "../Icon/Icon";
import { useAuthStore } from "../zustand/stores/authStore";

export interface FieldConfig<T> {
  name: Path<T>;
  type?: "text" | "email" | "password" | "checkbox" | "select" | "radio";
  placeholder: string;
  autoComplete?: string;
  options?: { label: string; value: string }[];
}

interface AuthFormProps<
  TSchema extends ObjectSchema<AnyObject>,
  TResult = void
> {
  schema: TSchema;
  sendToBackend: (data: InferType<TSchema>) => Promise<TResult>;
  titleForm: string;
  textForm: string;
  fields: FieldConfig<InferType<TSchema>>[];
  btnLabel: string;
  onSuccess?: (user: User) => void;
  successMessage?: ((user: User) => string) | string;
  otherContent1?: React.ReactNode;
  otherContent2?: React.ReactNode;
}

export default function AuthForm<TSchema extends ObjectSchema<AnyObject>>({
  sendToBackend,
  schema,
  titleForm,
  textForm,
  btnLabel,
  fields,
  successMessage,
  onSuccess,
  otherContent1,
  otherContent2,
}: AuthFormProps<TSchema>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormData = InferType<TSchema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await sendToBackend(data);
      console.log(" Sent to backend:", data);
      const user = useAuthStore.getState().user;
      const message =
        typeof successMessage === "function"
          ? successMessage(user)
          : successMessage;

      toast.success(message ?? "successful");
      reset();
      onSuccess?.(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.titleFormWrap}>
        <h3 className={css.titleForm}>{titleForm}</h3>
        <p className={css.textForm}>{textForm}</p>
      </div>
      {otherContent1}
      <div className={css.inputWrap}>
        {fields.map(({ name, type, options, ...rest }) => {
          const errorMessage = errors[name]?.message as string | undefined;

          if (type === "password") {
            return (
              <PasswordField
                key={name}
                name={name}
                register={register}
                error={errorMessage}
                placeholder={rest.placeholder}
                className={css.inputWrapper}
              />
            );
          }

          if (type === "checkbox") {
            return (
              <label key={name} className={css.checkboxWrapper}>
                <input type="checkbox" {...register(name)} />
                {rest.placeholder}
                {errorMessage && (
                  <span className={css.error}>{errorMessage}</span>
                )}
              </label>
            );
          }
          if (type === "select" && options) {
            return (
              <div key={name} className={css.inputWrapper}>
                <select {...register(name)}>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errorMessage && (
                  <span className={css.error}>{errorMessage}</span>
                )}
              </div>
            );
          }

          if (type === "radio" && options) {
            const selectedValue = watch(name);
            return (
              <div key={name} className={css.radioWrap}>
                <h4 className={css.radioLabel}>{rest.placeholder}</h4>
                <div key={name} className={css.radioGroup}>
                  {options.map((opt) => (
                    <label key={opt.value} className={css.radioOption}>
                      <input
                        type="radio"
                        value={opt.value}
                        {...register(name)}
                        className={css.hiddenRadio}
                      />
                      {selectedValue === opt.value ? (
                        <Icon
                          iconName={"radio-checked"}
                          size={24}
                          className={css.checked}
                        />
                      ) : (
                        <Icon iconName={"radio"} size={24} />
                      )}
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {errorMessage && (
                  <span className={css.error}>{errorMessage}</span>
                )}
              </div>
            );
          }

          return (
            <InputField
              key={name}
              name={name}
              register={register}
              error={errorMessage}
              type={type}
              className={css.inputWrapper}
              {...rest}
            />
          );
        })}
      </div>
      <Button
        type="submit"
        className={css.btnForm}
        color="btnPrimary"
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        {isSubmitting ? "Sending..." : btnLabel}
      </Button>
      {otherContent2}
    </form>
  );
}
