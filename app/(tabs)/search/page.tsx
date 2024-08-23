"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { MagnifyingGlassIcon as OutlineMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { searchFn } from "./action";
import Link from "next/link";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";

interface TweetFormState {
  error?: string[] | never[];
  tweets?: Tweet[] | never[];
}

interface Tweet {
  id: number;
  desc: string;
  created_at: string;
  updated_at: string;
  userId: number;
  user: User;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export default function Search() {
  const [state, action] = useFormState(searchFn, { error: [], tweets: [] });
  return (
    <div>
      <div className="flex gap-2 justify-center">
        <form action={action} className="flex flex-row gap-2">
          <div className="flex flex-col">
            <Input name="search" type="text" placeholder="search" errors={state.error !== null ? state.error : []} />
          </div>
          <Button style={{ height: "40px", width: "100px" }} text="Search" />
        </form>
      </div>
      {state.tweets !== null ? (
        <>
          {state.tweets.map((tweet: Tweet, idx: number) => {
            return (
              <Link href={`/tweets/${tweet.id}`} className="flex gap-5 border-b py-5" key={idx}>
                <div className="relative size-10 rounded-full overflow-hidden">
                  <Image fill src={tweet.user?.bio ?? ""} alt={tweet.user?.username ?? ""} />;
                </div>
                <div className="flex flex-col gap-1 *:text-white">
                  <div className="flex items-center gap-2 ">
                    <strong className="*:text-white">{tweet.user?.username}</strong>
                    <span className="text-sm text-neutral-500">{formatToTimeAgo(tweet.created_at.toString())}</span>
                  </div>
                  <p className="text-lg">{tweet.desc}</p>
                </div>
              </Link>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
