"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { smsLogin } from "./actions";
import { useFormState } from "react-dom";

export default function SMSLogin() {
  const [state, action] = useFormState(smsLogin, null);
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
          min={100000}
          max={999999}
        />
        <FormInput
          name="token"
          required
          type="number"
          placeholder="Verification Code"
        />
        <FormButton text="Verify" />
      </form>
    </div>
  );
}
