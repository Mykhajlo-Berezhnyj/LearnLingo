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

export interface FieldConfig<T> {
  name: Path<T>;
  type?: string;
  placeholder: string;
  autoComplete?: string;
}

interface AuthFormProps<TSchema extends ObjectSchema<AnyObject>> {
  schema: TSchema;
  sendToBackend: (data: InferType<TSchema>) => Promise<User>;
  titleForm: string;
  textForm: string;
  fields: FieldConfig<InferType<TSchema>>[];
  btnLabel: string;
  onSuccess?: (user: User) => void;
  successMessage?: ((user: User) => string) | string;
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
}: AuthFormProps<TSchema>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormData = InferType<TSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const user = await sendToBackend(data);
      console.log(" Sent to backend:", data);

      const message =
        typeof successMessage === "function"
          ? successMessage(user)
          : successMessage;

      toast.success(message ?? "successful");
      reset();
      onSuccess?.(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Помилка: ${err.message}`);
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

      <div className={css.inputWrap}>
        {fields.map(({ name, type, ...rest }) => {
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
    </form>
  );
}
