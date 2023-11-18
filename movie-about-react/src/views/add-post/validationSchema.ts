import { object, string, boolean, date } from "yup";

export const schema = object({
  title: string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  date: date()
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required"),
  content: string()
    .min(10, "Content must be at least 10 characters")
    .max(500, "Content must be less than 500 characters")
    .required("Content is required"),
  anonymous: boolean(),
}).required();
