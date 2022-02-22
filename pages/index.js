import { signIn, useSession } from "next-auth/react";
import { Layout, PlayListHome } from "../components/root";

export default function Home() {
  const { data: session } = useSession();

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
