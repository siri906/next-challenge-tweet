import db from "@/lib/db";
import { notFound } from "next/navigation";

import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "@/components/Like-button";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CommentInput from "@/components/comment-input";
import CommentList from "@/components/comment-list";

async function getTweet(id: number) {
  try {
    const tweet = db.tweet.findMany({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            bio: true,
          },
        },
        _count: {
          select: {
            Comment: true,
          },
        },
      },
    });
    return tweet;
  } catch (error) {
    return null;
  }
}

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache((tweetId) => getLikeStatus(tweetId, userId), ["tweetId-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

async function getCommentsList(tweetId: number) {
  const comments = db.comment.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
    },
  });

  return comments;
}

const getCachedComment = nextCache(getCommentsList, ["comment-list"], {
  tags: ["comment-list"],
  revalidate: 10000,
});

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }
  const session = await getSession();
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);
  const comments = await getCachedComment(tweet[0].id);
  console.log("comments", comments);
  return (
    <>
      <div className="p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Image width={28} height={28} className="size-7 rounded-full" src={tweet[0].user.bio ?? ""} alt={tweet[0].user.username} />
          <div>
            <span className="text-sm font-semibold">{tweet[0].user.username}</span>
            <div className="text-xs">
              <span>{formatToTimeAgo(tweet[0].created_at.toString())}</span>
            </div>
          </div>
        </div>
        <h2 className="mb-5">{tweet[0].desc}</h2>
        <div className="flex flex-col gap-5 items-start">
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
        </div>
      </div>
      <div className="comment_area">
        <CommentInput id={id} sessionId={session.id!} comments={comments} />
      </div>
    </>
  );
}
