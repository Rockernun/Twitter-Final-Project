export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-blue-500
            border-none placeholder:text-neutral-400 px-2.5"
            type="text"
            placeholder="Username"
            required
          />
          <span className="text-red-500 font-medium">Input Error</span>
        </div>
        <button className="primary-btn h-10">Create Account</button>
      </form>
    </div>
  );
}
