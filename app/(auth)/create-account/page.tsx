"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
      </div>
      <div>
        <form className="flex flex-col gap-3" action={action}>
          <Input name="username" type="text" placeholder="Username" errors={state?.fieldErrors.username} />
          <Input name="email" type="email" placeholder="Email" errors={state?.fieldErrors.email} />
          <Input name="password" type="password" placeholder="password" errors={state?.fieldErrors.password} />
          <Input name="confirmPassword" type="password" placeholder="confirm password" errors={state?.fieldErrors.confirmPassword} />
          <Button text="Create Account" />
        </form>
      </div>
    </div>
  );
}
