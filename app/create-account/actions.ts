"use server";
import { z } from "zod";

//  정규표현식
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

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
        invalid_type_error: "Username은 문자여야 합니다!",
        required_error: "Username을 입력해주세요!",
      })
      .min(3, "너무 짧아요!")
      .max(10, "너무 길어요!")
      .toLowerCase()
      .trim()
      .refine(checkUsername, 'Username에 "user"는 포함되면 안돼요!'),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(9)
      .regex(
        passwordRegex,
        "비밀번호는 소문자, 대문자, 특수문자를 포함하고 있어야 합니다!"
      ),
    confirm_password: z.string().min(9),
  })
  .refine(checkPassword, {
    message: "비밀번호가 달라요!",
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
  } else {
    console.log(result.data);
  }
}
