"use client";

import { InitialTweet } from "@/app/(tabs)/page";
import { useEffect, useState } from "react";
import TweetListItem from "./tweet-list-item";

interface TweetItemsProps {
  initialTweets: InitialTweet;
  keyword: string;
}

export default function TweetSearchItems({
  initialTweets,
  keyword,
}: TweetItemsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  useEffect(() => {
    if (keyword) {
      setTweets(initialTweets);
    }
  }, [keyword]);
  return (
    <div className="flex flex-col gap-5 w-full px-2">
      <ul className="w-full flex flex-col gap-5">
        {tweets.map((tweet) => (
          <TweetListItem key={tweet.id} {...tweet} />
        ))}
      </ul>
      {tweets.length === 0 && (
        <p className="text-red-500 text-center font-semibold text-sm">
          검색 결과가 없습니다!
        </p>
      )}
    </div>
  );
}
