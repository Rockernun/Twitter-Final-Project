import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface TweetListProps {
  context: string;
  id: number;
  created_at: Date;
  user: {
    id: number;
    username: string;
  };
  updated_at: true;
}

export default function TweetListItem({
  context,
  id,
  created_at,
  user: { username },
}: TweetListProps) {
  return (
    <li>
      <Link
        href={`/tweets/${id}`}
        className="flex gap-5 border-b-gray-500 border-b-[1px] pb-4"
      >
        <div className="bg-neutral-500 size-28 rounded-md" />
        <div className="flex flex-col gap-2">
          <h4>{username}</h4>
          <p>{context}</p>
          <span>{formatToTimeAgo(created_at.toString())}</span>
        </div>
      </Link>
    </li>
  );
}
