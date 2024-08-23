import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

//  인증되지 않은 사용자가 갈 수 있는 URL을 지정
const publicOnlyUrls: Routes = {
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  //  로그아웃 상태라면
  if (!session.id) {
    if (!exists) {
      //  redirect
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

//  해당 정규 표현식은 API로 시작하는 URL을 제외한 모든 URL에서 실행되어야 한다고 middleware에 알려준다.
//  혹은 _next/static, _next/image, favicon.icon 등도 포함
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
