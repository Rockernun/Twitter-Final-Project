import db from "@/lib/db";

export async function searchTweets(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: {
      OR: [
        {
          context: {
            contains: keyword,
          },
        },
      ],
    },
  });
}
