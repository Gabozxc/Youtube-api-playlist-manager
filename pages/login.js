import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import useCheckSession from "../hooks/useCheckSession";
import { Layout } from "../components/root";

export default function Login() {
  
  const session = useCheckSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center bg-blue-600 my-0 mx-auto mt-10 p-5 rounded shadow-md	max-w-[95%] sm:max-w-[45%] md:max-w-[25%]">
        <h1 className="text-xl font-bold text-white">Log in to your account</h1>
        <button
          className="bg-white hover:bg-transparent border-solid hover:bg-gray-100  text-blue-600 font-bold 
          py-2 px-4 rounded cursor-pointer shadow-md mt-5"
          onClick={() => signIn("google")}
        >
          Login with google
        </button>
      </div>
    </Layout>
  );
}
