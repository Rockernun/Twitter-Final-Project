"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

async function checkEmailExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(
      checkEmailExists,
      "해당 이메일을 사용하는 계정이 존재하지 않습니다!"
    ),
  password: z.string({
    required_error: "비밀번호를 입력해주세요!",
  }),
  //.min(PASSWORD_MIN_LENGTH)
  //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    //  bcrypt로 작성된 비밀번호로 해당 해시값을 만들었는지 알 수 있다.
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다!"],
          email: [],
        },
      };
    }
  }
}

//  이메일로 사용자를 찾는다.
//  만약 사용자를 찾았을 때, 비밀번호의 해시값을 확인한다.
//  비밀번호의 해시값이 일치한다면 사용자를 로그인 시킨다.
//  그리고 사용자를 /profile 페이지로 redirect 시킨다.
