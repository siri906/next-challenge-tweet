"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { MagnifyingGlassIcon as OutlineMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { searchFn } from "./action";
import db from "@/lib/db";
import TweetWrap from "@/components/Tweet-list-wrap";
import { useEffect, useState } from "react";

export default function Search() {
  const [state, action] = useFormState(searchFn, { error: [], tweets: [] });

  return (
    <div>
      <div className="flex gap-2 justify-center">
        <form action={action}>
          <Input name="search" type="text" placeholder="search" errors={state.error} />
          <Button text="Search" />
        </form>
      </div>
      {state.tweets ? (
        <>
          {state.tweets.map((item: any, idx: number) => {
            return <div key={idx}>{item.desc}</div>;
          })}
        </>
      ) : null}
    </div>
  );
}
