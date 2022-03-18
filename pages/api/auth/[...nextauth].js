import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "../model/Usuario";
import db from "../config/db";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner",
        },
      },
    }),
  ],
  jwt: {
    encryption: true,
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    //save email user
    async signIn({ account, profile }) {
      db.sync()
        .then(() => "Database synced!")
        .catch((error) => console.log(error));
      if (account.provider === "google") {
        if (profile.email) {
          const user = await User.findOne({
            where: {
              email: profile.email,
            },
          });
          console.log("revisando usuario");
          if (!user) {
            await User.create({
              email: profile.email,
            });
          }
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/user") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
});
