import dynamic from "next/dynamic";

import useCheckSession from "../hooks/useCheckSession";
import { Layout } from "../components/root";

const PlayListHome = dynamic(() => import("../components/PlayListHome"));

export default function Home() {

  const session = useCheckSession();

  return (
    <Layout>
      {!session && (
        <div className="flex justify-center flex-col items-center bg-blue-600 my-0 mx-auto max-w-[50%] mt-10 p-5 rounded shadow-md	">
          <h1 className="text-xl font-bold text-white">Vixfid </h1>
          <h2 className="text-white">Vixfid is an app that helps anyone manage and organize their YouTube playlist in a much better way. Never before has sorting your playlist been so easy</h2>
        </div>
      )}
      {session && <PlayListHome />}
    </Layout>
  );
}
