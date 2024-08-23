"use client";

import { useState } from "react";
import { InitialTweets } from "@/app/(auth)/page";
import TweetListItem from "./tweet-list-item";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  return (
    <div className="flex flex-col gap-5 w-full px-2">
      <ul className="w-full">
        {tweets.map((tweet) => (
          <TweetListItem key={tweet.id} {...tweet} />
        ))}
      </ul>
    </div>
  );
}
