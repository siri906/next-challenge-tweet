"use client";

import { editUserInfo } from "@/app/users/[username]/edit/action";
import Button from "./Button";
import Input from "./Input";
import { useFormState } from "react-dom";
import Image from "next/image";
import { useReducer } from "react";
import { notFound } from "next/navigation";

const userInfoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: action.event.target.value,
      };

    case "email":
      return {
        ...state,
        email: action.event.target.value,
      };

    case "bio":
      return;
    case "password":
      return {
        ...state,
        password: action.event.target.value,
      };
    case "confirmPassword":
      return {
        ...state,
        confirmPassword: action.event.target.value,
      };
    default:
      break;
  }
};

interface Props {
  user: any;
}

export default function EditForm({ user }: Props) {
  if (!user) {
    notFound();
  }
  const initialState = {
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
    confirmPassword: "",
  };
  const [state, action] = useFormState(editUserInfo, null);
  const [result, handleFn] = useReducer(userInfoReducer, initialState);

  return (
    <div className="h-screen flex justify-center items-center gap-10">
      <form action={action} className="flex flex-col gap-5">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Change {user.username} Infomation</h1>
          <div className="text-center my-10">
            <div className="size-40 overflow-hidden rounded-full">{user.bio !== null ? <Image src={user.bio} width={300} height={300} alt={user.username} /> : null}</div>
          </div>
        </div>
        <Input name="username" type="text" placeholder="Username" value={result.username} errors={state?.fieldErrors.username} onChange={(event) => handleFn({ type: "username", event })} />
        <Input name="email" type="email" placeholder="Email" value={result.email} errors={state?.fieldErrors.email} onChange={(event) => handleFn({ type: "email", event })} />
        <Input name="password" type="password" placeholder="password" value={result.password} errors={state?.fieldErrors.password} onChange={(event) => handleFn({ type: "password", event })} />
        <Input name="confirmPassword" type="password" placeholder="confirm password" value={result.confirmPassword} errors={state?.fieldErrors.confirmPassword} onChange={(event) => handleFn({ type: "confirmPassword", event })} />
        <Button style={{ width: "100%" }} text="Edit User Info" />
      </form>
    </div>
  );
}
