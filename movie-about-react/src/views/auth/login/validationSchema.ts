import { object, string, boolean, ref, Schema } from "yup";

export const loginSchema = object({
  username: string()
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one special character, and one digit"
    )
    .required("Password is required"),
}).required();
