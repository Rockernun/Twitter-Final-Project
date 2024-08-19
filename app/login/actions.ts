"use server";

import { redirect } from "next/navigation";

export const handleForm = async (prevState: any, formData: FormData) => {
  redirect("/"); //  이런 식으로 해당 POST 요청이 완료되면 리다이렉트 시킬 수도 있다.
  return {
    error: ["wrong password...", "Password too short..."],
  };
};
