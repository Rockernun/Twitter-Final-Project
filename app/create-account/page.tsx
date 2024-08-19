import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="username"
          required
          type="text"
          placeholder="Username"
          errors={[]}
        />
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
          errors={[]}
        />
        <FormInput
          name="password-confirm"
          required
          type="password"
          placeholder="Confirm Password"
          errors={[]}
        />
        <FormButton text="Create Account" />
      </form>
    </div>
  );
}
