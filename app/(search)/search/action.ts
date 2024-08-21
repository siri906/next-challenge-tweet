"use server";

import db from "@/lib/db";
import { error } from "console";
import { z } from "zod";

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

const formSchema = z.object({
  search: z.string().min(1, "검색어를 입력하세요."),
});

export async function searchFn(prev: any, formData: FormData) {
  console.log("prev", prev);
  const data = {
    search: formData.get("search"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      tweets: [],
      error: result.error.flatten().fieldErrors.search,
    };
  }

  const tweets = await searchTweet(result.data.search);

  return { error: [], tweets };
}
