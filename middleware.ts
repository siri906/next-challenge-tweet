import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: Boolean;
}

const publicOnlyUrl: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

// 순서 req, res
export async function middleware(req: NextRequest, res: NextResponse) {
  // console.log("res >>>>>>>>>>>>>>>>>>>>>>>>", res);
  // console.log("req >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res);
  // console.log("req >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req);

  const session = await getSession();
  const exists = publicOnlyUrl[req.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
