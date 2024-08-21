"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

//  coerce를 이용하면 사용자가 입력한 string을 number로 변환할 수 있다.
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogin(prevState: any, formData: FormData) {
  //  console.log(typeof formData.get("token"));  결과 : string
  //  console.log(typeof tokenSchema.parse(formData.get("token")));  결과 : number
}
