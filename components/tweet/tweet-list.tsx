"use client";

import { useEffect, useState } from "react";
import { InitialTweet } from "@/app/(tabs)/page";
import TweetListItem from "./tweet-list-item";
import getMoreTweet, { getTotalTweetCount } from "@/app/(tabs)/actions";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";

interface TweetListProps {
  initialTweets: InitialTweet;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const onClickPagination = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const btn = event.currentTarget.name;
    setLoading(true);
    let newTweets;
    if (btn === "next") {
      newTweets = await getMoreTweet(page + 1);
      if (newTweets.length !== 0) {
        setPage((prev) => prev + 1);
        setTweets(newTweets);
      }
    } else {
      newTweets = await getMoreTweet(page - 1);
      if (newTweets.length !== 0) {
        setPage((prev) => prev - 1);
        setTweets(newTweets);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchTotalCount = async () => {
      const totalCountNumber = await getTotalTweetCount();
      setTotalCount(totalCountNumber);
    };
    fetchTotalCount();
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full px-2">
      <ul className="w-full">
        {tweets.map((tweet) => (
          <TweetListItem key={tweet.id} {...tweet} />
        ))}
      </ul>
      <ul>
        <li>
          <button
            name="previous"
            onClick={onClickPagination}
            disabled={loading || page === 0}
            className="block p-1.5 rounded-md bg-blue-500 hover:bg-blue-300 disabled:bg-neutral-800 disabled:text-neutral-400"
          >
            <ArrowLeftIcon className="size-5" />
          </button>
        </li>
        <li>
          <span>{page + 1}</span>
        </li>
        <li>
          <button
            name="next"
            onClick={onClickPagination}
            disabled={loading || page + 1 >= totalCount}
            className="block p-1.5 rounded-md bg-blue-500 hover:bg-blue-300 disabled:bg-neutral-800 disabled:text-neutral-400"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </li>
      </ul>
    </div>
  );
}
