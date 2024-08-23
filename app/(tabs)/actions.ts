"use server";

import db from "@/lib/db";

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
