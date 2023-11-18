import { object, string, ref } from "yup";

export const registrationSchema = object({
  username: string()
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one special character, and one digit"
    )
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
}).required();

export default registrationSchema;
