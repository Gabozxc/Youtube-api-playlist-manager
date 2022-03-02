import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";

export async function middleware(req) {
  const secret = process.env.SECRET;

  const token = await getToken({ req, secret, encryption: true });
  const accessToken = token?.accessToken;

  if (token) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );
      res.status;
    } catch (err) {
      signOut();
    }
  }
}
