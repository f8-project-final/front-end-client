import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is not true format" }),
  password: z.string().min(6),
});
// .refine(
//   (password, confirmPassword) => password === confirmPassword,
//   "Password is not same"
// );
