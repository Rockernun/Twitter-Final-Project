"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

//  action을 useFormState로 넘겨주면 useFormState는 action의 결과와 action을 실행하는 트리거를 돌려준다.
//  useFormState가 action을 호출하면 action은 formData와 함께 이전에 반환된 state, 또는 처음에 설정해둔 state와 실행된다.
export default function LogIn() {
  const [state, action] = useFormState(handleForm, null); //  초깃값을 null로 초기화
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">안녕하세요!</h1>
        <h2 className="text-xl">Log in with E-mail and Password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          required
          type="email"
          placeholder="Email"
          errors={[]}
        />
        <FormInput
          name="password"
          required
          type="password"
          placeholder="Password"
          errors={state?.error ?? []}
        />
        <FormButton text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
