"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { loginFn } from "./action";

export default function SignIn() {
  const [state, dispatch] = useFormState(loginFn, null);

  return (
    <div className="max-w-96 w-full h-screen flex items-center mx-auto">
      <form action={dispatch} className="flex flex-col gap-3 w-full">
        <Input name="email" type="email" placeholder="Email" errors={state?.fieldErrors.email} />
        <Input name="username" type="text" placeholder="username" errors={state?.fieldErrors.username} />
        <Input name="password" type="password" placeholder="password" errors={state?.fieldErrors.password} required />
        <Button text="LogIn" />
        {state === undefined ? <div className="bg-emerald-500 p-4 rounded-lg">Welcome back!</div> : null}
      </form>
    </div>
  );
}
