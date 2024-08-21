"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { smsLogin } from "./actions";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">SMS Log In</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="phone"
          required
          type="text"
          placeholder="Phone number"
          errors={state.error?.formErrors}
        />
        {state.token ? (
          <FormInput
            name="token"
            required
            type="number"
            placeholder="Verification Code"
            min={100000}
            max={999999}
          />
        ) : null}
        <FormButton text={state.token ? "토큰 인증하기" : "인증 문자 보내기"} />
      </form>
    </div>
  );
}

//  왜 14번 라인에서 두 번째 파라미터로 null을, 29번 라인에 state?.token을 작성하면 Unhandled Runtime Error가 발생할까?
