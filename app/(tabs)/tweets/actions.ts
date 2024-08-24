"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  newTweet: z
    .string({
      required_error: "트윗 내용을 적어주세요.",
    })
    .min(10, "10자 이상 적어주세요!")
    .max(300, "300자까지 작성 가능합니다!"),
});

export default async function addTweet(_: any, formData: FormData) {
  const data = {
    newTweet: formData.get("newTweet"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: "Your tweet content",
          context: result.data.newTweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
          context: true,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
