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

export const trialSchema = yup.object({
  reason: yup
    .string()
    .required("Please select your main reason for learning English"),

  FullName: yup
    .string()
    .trim()
    .min(3, "Must be at least 3 characters long")
    .max(28, "Must be at most 28 characters long")
    .required("Full name is required"),

  email: yup
    .string()
    .trim()
    .email("Must be a valid email")
    .required("Email is required"),

  PhoneNumber: yup
    .string()
    .trim()
    .matches(/^\+?[0-9\s-]{7,15}$/, "Must be a valid phone number")
    .required("Phone number is required"),
});

export type TrialData = yup.InferType<typeof trialSchema>;
