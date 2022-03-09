import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import vixLogo from "/public/images/logo-380x98.png";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-blue-500 p-5">
      <div className="flex justify-between items-center	">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-white text-lg font-bold max-w-[250px]">
              <Image src={vixLogo} alt="Vix vixLogo" priority={true} />
            </a>
          </Link>
          <div className="flex items-center ml-10 font-bold">
            <p className="text-white">Playlist management on steroids</p>
          </div>
        </div>
        <div className="">
          {session ? (
            <button
              onClick={() => signOut("google")}
              className="bg-red-500 hover:bg-transparent border-solid	 hover:bg-red-700  text-white font-bold 
                py-2 px-4 rounded cursor-pointer"
            >
              Log out
            </button>
          ) : (
            <Link href="/login">
            <a
              className={`bg-blue-600 hover:bg-transparent border-solid	 hover:bg-blue-800  text-white font-bold 
              py-2 px-4 rounded cursor-pointer ${router.asPath === "/login" && "hidden"}`}
            > 
              Login 
            </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
