// Redirect users to login page using auth0 sdk for authentication
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';


export default withMiddlewareAuthRequired();

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
