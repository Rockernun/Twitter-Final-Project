"use server";
import { z } from "zod";

function checkUsername(username: string) {
  return !username.includes("user");
}

function checkPassword({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) {
  return password === confirm_password ? true : false;
}

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a String!",
        required_error: "Please write a Username!",
      })
      .min(3, "Way too short!")
      .max(10, "That is too long!")
      .refine(checkUsername, 'No "user" allowed!'),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
