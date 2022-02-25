import { signIn, signOut, useSession } from "next-auth/react";

import { Layout, PlayListHome } from "../components/root";

export default function Home() {

  const { data: session } = useSession();

  //get expire time from session
  const expireTime = session ? session.expires : null;

  //get times and signout
  const time = expireTime ? new Date(expireTime) : null;
  const timeNow = new Date();

  //get time difference
  const timeDiff = time ? timeNow.getTime() - time.getTime() : null;

  //if time difference is greater than 0, signout and redirect to signin
  if (timeDiff > 0) {
    signOut({ returnTo: "/" });
  }

  return (
    <Layout>
      {!session && (
        <>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex justify-center 
            my-0 mx-auto"
          >
            Sign In With Google
          </button>
        </>
      )}
      {session && <PlayListHome />}
    </Layout>
  );
}
