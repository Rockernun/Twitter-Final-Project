"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

async function checkUniqueUsername(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
}

async function checkUniqueEmail(email: string) {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(userEmail);
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
      .toLowerCase()
      .trim()
      .refine(checkUniqueUsername, "이미 존재하는 Username입니다!"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        checkUniqueEmail,
        "해당 이메일은 이미 등록되어 있는 이메일입니다!"
      ),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    //  username이 이미 존재하는지
    //  email을 이미 누가 사용하고 있는지
    //  위의 2가지를 통과할 때, 비밀번호를 해싱한다.
    //  사용자를 데이터베이스에 저장하고, 저장되면 사용자를 로그인 시킨다.
    //  home으로 redirect 시키기
  }
}

//  Unhandled Runtime Error 발생
/*
Error: Async refinement encountered during synchronous parse operation.
       Use .parseAsync instead.
*/
//  checkUniqueEmail과 checkUniqueUsername 모두 async와 await를 가지고 있다.
//  그래서 Zod도 await를 하도록 해야 한다.
//  따라서 safeParse를 하고 싶지만 async로 하고 싶다고 메서드를 수정해야 한다.
