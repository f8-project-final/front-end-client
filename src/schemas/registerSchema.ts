import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Email is not true format" }),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.string(),
});
// .refine(
//   (password, confirmPassword) => password === confirmPassword,
//   "Password is not same"
// );
