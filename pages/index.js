import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

import { Layout, PlayListHome } from "../components/root";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await axios.post("/api/checkSession", {
        withCredentials: true,
      });

      if (!data.token) {
        signOut();
      }
    };
    checkSession();
  }, []);

  return (
    <Layout>
      {!session && (
        <div className="flex justify-center  mt-10">
          <h1 className="text-xl font-bold">Login with google to start using the application</h1>
        </div>
      )}
      {session && <PlayListHome />}
    </Layout>
  );
}
