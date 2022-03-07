import dynamic from "next/dynamic";

import useCheckSession from "../hooks/useCheckSession";
import { Layout } from "../components/root";

const PlayListHome = dynamic(() => import("../components/PlayListHome"));

export default function Home() {

  const session = useCheckSession();

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
