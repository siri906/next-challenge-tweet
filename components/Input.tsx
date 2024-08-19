import { InputHTMLAttributes } from "react";

interface FormProps {
  name: string;
  errors?: string[];
}

export default function Input({ name, errors = [], ...rest }: FormProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input className="p-5 bg-transparent rounded-md w-full h-10 bg-white text-blue-600" name={name} {...rest} />
      {errors.map((error, idx) => {
        return (
          <span key={idx} className="text-red-500 font-medium">
            {error}
          </span>
        );
      })}
    </div>
  );
}
