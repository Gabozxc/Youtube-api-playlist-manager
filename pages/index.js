import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { Layout, PlayListHome } from "../components/root";

export  default function Home() {
  
  const { data: session } = useSession();
  
  useEffect(() => {
    const sessionStatus = async () => {
      try {
        const sessionStatus = await fetch("/api/checkSession")
      }
      catch(err){
        signOut();
      }
    }
    sessionStatus();
  }, [session])


  return (
    <Layout>
      {!session && (
        <div className="flex justify-center  mt-10">
          <h1 className="text-xl font-bold">
            Login with google to start using the application
          </h1>
        </div>
      )}
      {session && <PlayListHome />}
    </Layout>
  );
}
