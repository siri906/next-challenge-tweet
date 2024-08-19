import { InitialTweets } from "@/app/(tabs)/page";
import db from "@/lib/db";

interface Props {
  initialTweets: InitialTweets;
}

async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      bio: true,
    },
  });

  return user;
}

export default async function TweetList({ initialTweets }: Props) {
  // const userInfo = initialTweets.map(async (item) => {
  //   return await getUser(item.userId);
  // });

  const userId = initialTweets[0].userId!;
  const userInfo = await getUser(userId);
  console.log("userInfo>>>>>>>>>>>>>>>>>>>>>>>>>>", userInfo);

  console.log("initialTweets", initialTweets);
  return <div></div>;
}
