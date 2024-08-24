import { logOut } from "@/app/(tabs)/actions";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function ButtonLogOut() {
  const user = await getUser();
  return (
    <form action={logOut} className="my-5 px-8 pt-8 pb-16">
      <button className="btn rounded-full flex w-full items-center justify-center">
        <span className="text-lg">로그아웃</span>
      </button>
    </form>
  );
}
