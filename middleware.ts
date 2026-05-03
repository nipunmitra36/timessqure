export { default } from "next-auth/middleware"

export const config = {
  matcher: [
  "/editor/:path*",
  "/dashboard/:path*",
  "/profile/:path*",
]  // আপনার edit page এর path দিন
}