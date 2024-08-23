import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  desc: string;
  created_at: Date;
  id: number;
  userId: number;
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

export default async function TweetItem({ desc, created_at, id, userId }: Props) {
  const userInfo = await getUser(userId);
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5 border-b py-5">
      <div className="relative size-10 rounded-full overflow-hidden">
        <Image fill src={userInfo?.bio ?? ""} alt={userInfo?.username ?? ""} />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <div className="flex items-center gap-2 ">
          <strong className="*:text-white">{userInfo?.username}</strong>
          <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
        </div>
        <p className="text-lg">{desc}</p>
      </div>
    </Link>
  );
}
