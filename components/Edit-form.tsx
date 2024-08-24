"use client";

import { editUserInfo } from "@/app/users/[username]/edit/action";
import Button from "./Button";
import Input from "./Input";
import { useFormState } from "react-dom";
import Image from "next/image";
import { useReducer, useState } from "react";
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
      return {
        ...state,
        bio: action.event.target.value,
      };
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
  const [preview, setPreview] = useState(user.bio);
  const [state, action] = useFormState(editUserInfo, null);
  const [result, handleFn] = useReducer(userInfoReducer, initialState);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="h-screen flex justify-center items-center gap-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">Change {user.username} Infomation</h1>
        <div>
          <label htmlFor="bio" style={{ backgroundImage: `url(${preview})` }} className="bg-center bg-cover border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer size-40 my-10">
            <>
              <div className="text-white text-sm bg-slate-800 p-2 rounded-lg">클릭시 사진 변경</div>
              {state?.fieldErrors.bio}
            </>
          </label>
        </div>
      </div>
      <div>
        <form action={action} className="flex flex-col gap-5">
          <Input name="username" type="text" placeholder="Username" value={result.username} errors={state?.fieldErrors.username} onChange={(event) => handleFn({ type: "username", event })} />
          <Input name="email" type="email" placeholder="Email" value={result.email} errors={state?.fieldErrors.email} onChange={(event) => handleFn({ type: "email", event })} />
          <Input name="password" type="password" placeholder="password" value={result.password} errors={state?.fieldErrors.password} onChange={(event) => handleFn({ type: "password", event })} />
          <Input name="confirmPassword" type="password" placeholder="confirm password" value={result.confirmPassword} errors={state?.fieldErrors.username} onChange={(event) => handleFn({ type: "confirmPassword", event })} />
          <input onChange={onImageChange} type="file" id="bio" name="bio" accept="image/*" className="hidden" />
          <Button style={{ width: "100%" }} text="Edit User Info" />
        </form>
      </div>
    </div>
  );
}
