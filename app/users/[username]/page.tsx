import TweetItem from "@/components/Tweet-Item";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser(username: string) {
  if (username) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      return user;
    }
  } else {
    notFound();
  }
}

async function getUserTweets(userId: number) {
  if (userId) {
    const tweets = await db.tweet.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        created_at: true,
        desc: true,
        userId: true,
      },
    });
    if (tweets) {
      return tweets;
    }
  } else {
    notFound();
  }
}

export default async function UserList({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  console.log("user", user);
  if (!user) {
    notFound();
  }
  const postTweets = await getUserTweets(user.id);

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">
            Welcome! <strong>{user.username}</strong>
          </h1>
          <div className="text-center my-10">
            <div className="size-40 overflow-hidden rounded-full">{user.bio !== null ? <Image src={user.bio} width={300} height={300} alt={user.username} /> : null}</div>
            <p className="text-2xl mt-5">{user.username}</p>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Link className="w-56 h-14 bg-blue-500 rounded-lg flex justify-center items-center" href={`/users/${user.username}/edit`}>
            유저정보 수정하기
          </Link>
          <form action={logOut}>
            <button className="w-56 h-14 bg-red-500 rounded-lg flex justify-center items-center">Log out</button>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-5">내가 작성한 트위터 목록</h2>
        <div>
          {postTweets?.map((tweet) => (
            <TweetItem key={tweet.id} {...tweet} />
          ))}
        </div>
      </div>
    </div>
  );
}
