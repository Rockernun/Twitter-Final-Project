import { formatToTimeAgo } from "@/lib/utils";

interface TweetCommentItemProps {
  context: string;
  id: number;
  created_at: Date;
  user: {
    username: string;
  };
  updated_at: Date;
}

export default function TweetCommentItem({
  context,
  id,
  created_at,
  user,
}: TweetCommentItemProps) {
  return (
    <li className="w-full">
      <article className="flex gap-5 border-b-neutral-600 bordr-b-[1px] pb-4 border-dashed">
        <div className="bg-neutral-500 size-28 rounded-md" />
        <div className="flex flex-col gap-3 w-4/5">
          <div className="flex flex-row justify-between *:text-sm">
            <h4 className="font-semibold">{user.username}</h4>
            <span>{formatToTimeAgo(created_at.toString())}</span>
          </div>
          <p className="w-full">{context}</p>
        </div>
      </article>
    </li>
  );
}
