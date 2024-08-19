interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

//  type과 placeholder, error message, required 여부는 외부에서 커스텀 가능하도록
export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-blue-500
            border-none placeholder:text-neutral-400 px-2.5"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
