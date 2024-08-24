"use server";

import db from "@/lib/db";
import { z } from "zod";

export default async function getMoreTweet(page: number) {
  const otherTweet = await db.tweet.findMany({
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      context: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    skip: page * 1,
    take: 1,
    orderBy: { created_at: "desc" },
  });
  return otherTweet;
}

export async function getTotalTweetCount() {
  return await db.tweet.count();
}

const searchSchema = z.object({
  keyword: z.string({
    required_error: "키워드를 입력해주세요!",
  }),
});

export async function getSearchedTweet(_: any, formData: FormData) {
  const data = {
    keyword: formData.get("keyword"),
  };
  const result = await searchSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const tweets = await db.tweet.findMany({
      where: {
        OR: [
          {
            context: {
              contains: result.data.keyword,
            },
          },
        ],
      },
    });
    console.log(tweets);
  }
}
