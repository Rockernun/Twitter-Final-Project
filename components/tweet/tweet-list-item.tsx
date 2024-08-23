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
        className="grid grid-cols-[126px_1fr] gap-5 border-b-gray-500 border-b-[1px] pb-4"
      >
        <div className="bg-neutral-500 size-28 rounded-md" />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row justify-between *:text-sm">
            <h4 className="font-semibold">{username}</h4>
            <span>{formatToTimeAgo(created_at.toString())}</span>
          </div>
          <p className="w-full">{context}</p>
        </div>
      </Link>
    </li>
  );
}
