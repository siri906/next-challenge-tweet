import TweetList from "@/components/Tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialTweets() {
  const tweets = db.tweet.findMany({
    select: {
      desc: true,
      id: true,
      created_at: true,
      userId: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

const searchTweet = async (search: string) => {
  const keyword = search || "";
  if (keyword === "") {
    return "";
  } else {
    const tweets = await db.tweet.findMany({
      where: {
        desc: {
          contains: keyword,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return tweets;
  }
};

export interface InitialTweets {
  id: number;
  desc: string;
  created_at: Date;
  userId: number;
}

export default async function TweetWrap(value: any) {
  const initialTweets = (await searchTweet(value.search ?? "")) ?? "";

  return <TweetList initialTweets={initialTweets} />;
}
