import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BACKEND_URL } from "./constants";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const refreshToken = request.cookies.get("refresh_token");

  const cookies = [];
  if (session) cookies.push(`session=${encodeURIComponent(session.value)}`);
  if (refreshToken)
    cookies.push(`refresh_token=${encodeURIComponent(refreshToken.value)}`);
  const cookieHeader = cookies.join("; ");

  const publicPaths = ["/auth/login", "/auth/register"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (isPublicPath && (session || refreshToken)) {
    try {
      const verifyResponse = await fetch(`${BACKEND_URL}/user/profile`, {
        headers: {
          Cookie: cookieHeader,
        },
      });

      if (verifyResponse.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error verifying token on public path:", error);
    }
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!session && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const verifyResponse = await fetch(`${BACKEND_URL}/user/profile`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!verifyResponse.ok) {
      if (refreshToken) {
        const refreshResponse = await fetch(
          `${BACKEND_URL}/user/refresh-token`,
          {
            method: "POST",
            headers: {
              Cookie: cookieHeader,
            },
          }
        );

        if (refreshResponse.ok) {
          const newAccessToken = refreshResponse.headers.get("set-cookie");
          if (newAccessToken) {
            const response = NextResponse.next();
            response.headers.set("set-cookie", newAccessToken);
            return response;
          }
        }
      }

      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
