import { InputHTMLAttributes } from "react";

interface FormInputProps {
  errors?: string[];
  name: string;
  icon?: string;
}

export default function FormInput({
  errors = [],
  name,
  icon,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(rest);
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-blue-500
            border-none placeholder:text-neutral-400 px-2.5"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
