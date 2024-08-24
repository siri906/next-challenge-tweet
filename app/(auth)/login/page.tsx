"use client";

import { useFormState } from "react-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { login } from "./action";
import Link from "next/link";

export default function Login() {
  const [state, formAction] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Login with email and pass</h2>
      </div>
      <div>
        <form action={formAction} className="flex flex-col gap-3">
          <Input name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
          <Input name="password" type="password" placeholder="password" required errors={state?.fieldErrors.password} />
          <Button text="Login" />
        </form>
        <div className="flex items-center justify-center my-5">
          <Link href={"/create-account"}>회원가입</Link>
        </div>
        <div>
          <p>test info</p>
          <p>test@mail.com</p>
          <p>12341234</p>
        </div>
      </div>
    </div>
  );
}
