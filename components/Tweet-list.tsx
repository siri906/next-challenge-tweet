import { InitialTweets } from "@/app/(tabs)/page";
import TweetItem from "./Tweet-Item";

interface Props {
  initialTweets: InitialTweets[];
}

export default function TweetList({ initialTweets }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {initialTweets?.map((tweet) => (
        <TweetItem key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}
