import { notFound } from "next/navigation";
import { searchTweets } from "./actions";
import TweetSearchItems from "@/components/tweet/tweet-search-item";

export default async function SearchPages({
  searchParams,
}: {
  searchParams: { keyword: string };
}) {
  const keyword = searchParams.keyword;
  if (!keyword) {
    notFound();
  }

  const [tweets] = await Promise.all([searchTweets(keyword)]);
  return (
    <div className="flex flex-col items-center min-h-screen px-5 pt-6">
      <h1 className="mb-5 text-white font-semibold text-lg">
        {keyword} ✔︎ 검색 결과 : {tweets.length}건
      </h1>
      <TweetSearchItems initialTweets={tweets} keyword={keyword} />
    </div>
  );
}
