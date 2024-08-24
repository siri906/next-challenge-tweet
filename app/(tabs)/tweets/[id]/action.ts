"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const commentSchema = z.object({
  payload: z.string(),
  tweetId: z.string(),
});

export const likePost = async (tweetId: number) => {
  const sesstion = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: sesstion.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
};

export const dislikePost = async (tweetId: number) => {
  const sesstion = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: sesstion.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
};

export const uploadComment = async (_: any, formData: FormData) => {
  const data = {
    payload: formData.get("comment"),
    tweetId: formData.get("tweetId"),
  };
  const result = commentSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    try {
      const session = await getSession();
      const { id, created_at, payload, tweetId, userId } = await db.comment.create({
        data: {
          payload: result.data.payload,
          tweet: {
            connect: {
              id: Number(result.data.tweetId),
            },
          },
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
      revalidateTag("comment-list");
      const test = { id, created_at, payload, tweetId, userId };
      return test;
    } catch (e) {}
  }
};
