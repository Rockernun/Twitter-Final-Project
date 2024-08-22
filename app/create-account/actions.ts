"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";

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
  console.log(cookies());
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
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    //  쿠키에 넣고 싶은 정보를 session에 저장(사용자에게 user-ticket 쿠키를 받는다)
    const session = await getIronSession(cookies(), {
      cookieName: "user-ticket",
      password: process.env.COOKIE_PASSWORD!, //  끝의 ! 표시는 TS에게 .env 안에 COOKIE_PASSWORD가 무조건 존재한다는 것을 알려주는 것
    });
    //@ts-ignore
    session.id = user.id; //  쿠키에 데이터를 추가한다.
    await session.save(); //  그리고 쿠키를 저장
    redirect("/profile");
  }
}

//  user-ticket 쿠키가 존재할 수도, 존재하지 않을 수도 있다.
//  존재하지 않는다면 iron session이 암호화된 user-ticket 쿠키를 만든다.
