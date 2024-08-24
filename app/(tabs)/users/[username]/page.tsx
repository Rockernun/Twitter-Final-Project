import FormButton from "@/components/form-btn";
import { getUser } from "./actions";
import TweetListItem from "@/components/tweet/tweet-list-item";
import Link from "next/link";
import ButtonLogOut from "@/components/form/button-logout";

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);
  return (
    <div className="container-basic mb-20 *:w-full">
      <h2 className="mb-5 text-lg font-bold text-neutral-400">프로필</h2>
      <section className="mb-10 md:grid grid-flow-col items-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold text-green-500 uppercase">
            {user?.username}
          </h1>
          <div className="size-28 rounded-full bg-neutral-100" />
        </div>
        <ul className="w-full flex flex-col gap-3 px-5 *:flex *:flex-row *:gap-3">
          <li>
            <span className="opacity-80">이름</span>
            <p>{user?.username}</p>
          </li>
          <li>
            <span className="opacity-80">이메일</span>
            <p>{user?.email}</p>
          </li>
          <li>
            <span className="opacity-80">소개</span>
            <p>{user?.bio ? user.bio : "자기 소개를 해볼까요?"}</p>
          </li>
          <li className="w-full">
            <Link
              href={`/users/${user?.username}/edit`}
              className="w-full p-3 rounded-3xl mt-3 text-center bg-blue-500 text-white font-medium hover:bg-green-500 transition disabled:bg-neutral-400 disabled:text-neutral-100"
            >
              프로필 편집
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="mb-5 text-lg font-bold text-neutral-400">트윗</h2>
        <ul className="flex flex-col gap-5 last:border-b-0">
          {user?.tweets?.map((tweet) => (
            <TweetListItem key={tweet.id} user={user} {...tweet} />
          ))}
        </ul>
      </section>
      <ButtonLogOut />
    </div>
  );
}
