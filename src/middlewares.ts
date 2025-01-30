// // middleware.ts (Next.js)
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { BASE_URL } from "./constants";

// export async function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get("access_token");
//   const refreshToken = request.cookies.get("refresh_token");

//   const publicPaths = [
//     "/auth/login",
//     "/auth/register",
//     "/api/auth/login",
//     "/api/auth/register",
//   ];
//   const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

//   if (isPublicPath && (accessToken || refreshToken)) {
//     try {
//       const verifyResponse = await fetch(`${BASE_URL}/auth/verify`, {
//         headers: {
//           Cookie: `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`,
//         },
//       });

//       if (verifyResponse.ok) {
//         return NextResponse.redirect(new URL("/", request.url));
//       }
//     } catch (error) {
//       console.error("Error verifying token:", error);
//     }
//   }

//   if (isPublicPath) {
//     return NextResponse.next();
//   }

//   if (!accessToken && !refreshToken) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   try {
//     const verifyResponse = await fetch(`${BASE_URL}/auth/verify`, {
//       headers: {
//         Cookie: `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`,
//       },
//     });

//     if (!verifyResponse.ok) {
//       if (refreshToken) {
//         const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
//           method: "POST",
//           headers: {
//             Cookie: `refresh_token=${refreshToken.value}`,
//           },
//         });

//         if (refreshResponse.ok) {
//           const response = NextResponse.next();

//           const newAccessToken = refreshResponse.headers.get("set-cookie");
//           if (newAccessToken) {
//             response.headers.set("set-cookie", newAccessToken);
//           }

//           return response;
//         }
//       }

//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
