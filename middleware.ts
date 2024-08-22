import { NextRequest } from "next/server";

//  profile 페이지로 가야 하는 사용자는 이 response를 받게 된다.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/profile") {
    return Response.redirect(new URL("/", request.url));
  }
}
