import { object, string, boolean, date } from "yup";

export const schema = object({
  content: string()
    .max(500, "Content must be less than 500 characters")
    .required("Content is required"),
}).required();
