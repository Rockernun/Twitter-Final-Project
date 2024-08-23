import { TweetDetail } from "@/app/(tabs)/tweets/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import TweetLikeButton from "./tweet-like-button";

interface TweetDetailItemsProps {
  tweet: TweetDetail;
  likeCount: number;
  isLiked: boolean;
}

export default function TweetDetailItem({
  tweet,
  likeCount,
  isLiked,
}: TweetDetailItemsProps) {
  return (
    <article className="flex gap-5">
      <div className="bg-neutral-500 size-28 rounded-md" />
      <div className="flex flex-col gap-3 w-4/5">
        <div className="flex flex-row justify-between *:text-sm">
          <h4 className="font-semibold">{tweet?.user.username}</h4>
          <span>
            {tweet
              ? formatToTimeAgo(tweet.created_at.toString())
              : "unknown date"}
          </span>
        </div>
        <p className="w-full">{tweet?.context}</p>
        <TweetLikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={tweet!.id}
        />
      </div>
    </article>
  );
}
