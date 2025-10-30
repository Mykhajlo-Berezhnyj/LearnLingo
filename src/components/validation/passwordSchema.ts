import * as yup from "yup";

export const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one digit")
  .matches(
    /[@$!%*?&^#()_\-+=]/,
    "Password must contain at least one special character"
  )
  .required("Password is required");
