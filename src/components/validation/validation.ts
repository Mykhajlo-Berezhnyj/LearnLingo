import * as yup from "yup";
import { passwordSchema } from "./passwordSchema";

export const registrationSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "must be at least 3 characters long")
      .max(28, "must be at most 28 characters long")
      .required("Name is required"),
    email: yup
      .string()
      .email("must be a valid email")
      .required("Email is required"),
    password: passwordSchema,
  })
  .required();

export type RegistrationData = yup.InferType<typeof registrationSchema>;

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export type LoginData = yup.InferType<typeof loginSchema>;
