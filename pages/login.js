import { signIn } from "next-auth/react";
import Image from "next/image";

import logoGoogle from "/public/images/logo-google.svg";

import { Layout } from "../components/root";

export default function Login() {
  return (
    <Layout>
      <div className="flex justify-center flex-col items-center  my-0 mx-auto mt-10 p-5 rounded shadow-md	max-w-[95%] sm:max-w-[45%] md:max-w-[28%]">
        <h1 className="text-xl font-bold text-black">Sign in</h1>
        <button
          className="px-4 mt-3 text-gray-900 bg-white border-gray-500 rounded-md shadow  hover:bg-[#4285F4] hover:text-white hover:border-blue-400 focus:outline-none font-roboto flex items-center justify-between"
          onClick={() => signIn("google")}
        >
          <div className="mr-[8px] flex items-center">
            <Image
              src={logoGoogle}
              alt="Logo google"
              priority={true}
              width="40px"
            />
          </div>
          <span>Sign in with Google</span>
        </button>
        <p className="text-gray-500 mt-5">
          For now the application is in approval status by Google, so it will
          take one more step to login
        </p>
      </div>
    </Layout>
  );
}
