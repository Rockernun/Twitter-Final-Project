"use server";
import { z } from "zod";

//  example
const usernameSchema = z.string().min(5).max(10);

export async function createAccount(prevState: any, formData: FormData) {
  //  유효성을 검사하고 싶은 데이터 객체
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  console.log(data);
  usernameSchema.parse(data.username); //  parse 메서드 사용
}

//  우리가 해야 할 일은 Zod에게 데이터가 어떻게 생겼는지 알려주고, parse 메서드에 사용자가 쓴 데이터를 넣어주면 된다.
//  그러면 Zod가 Schema를 보고 사용자가 작성한 값이 형태에 맞는지 검사할 거고, 형태가 맞지 않으면 에러를 발생시킨다.
