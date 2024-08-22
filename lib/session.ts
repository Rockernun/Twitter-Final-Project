import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number; //  세션에 id가 없을 수도 있다. 로그인한 사용자만 쿠키에 id를 가지고 있다.
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "user-ticket",
    password: process.env.COOKIE_PASSWORD!,
  });
}
