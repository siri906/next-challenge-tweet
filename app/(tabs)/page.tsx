import TweetList from "@/components/Tweet-list";
import db from "@/lib/db";

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

export interface InitialTweets {
  id: number;
  desc: string;
  created_at: Date;
  userId: number;
}

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <>
      <div>form</div>
      <TweetList initialTweets={initialTweets} />
    </>
  );
}
