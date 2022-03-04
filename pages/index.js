import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios"
import dynamic from 'next/dynamic'


import { Layout } from "../components/root";

const PlayListHome = dynamic(() => import('../components/PlayListHome'))


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
          <h1 className="text-xl font-bold">
            Login with google to start using the application
          </h1>
        </div>
      )}
      {session && <PlayListHome />}
    </Layout>
  );
}
