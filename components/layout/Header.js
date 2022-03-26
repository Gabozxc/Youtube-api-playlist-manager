import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import vixLogo from "/public/images/logo-380x98.png";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const { loading } = useSelector((state) => state.youtubeApi);

  return (
    <header className="bg-blue-500 p-5 relative">
      <div className="flex flex-row justify-between sm:items-center mt-3 sm:mt-0">
        <div className="flex items-center flex-col sm:flex-row mb-3 sm:mb-0">
          <Link href="/">
            <a className="text-white text-lg font-bold max-w-[120px] sm:max-w-[250px] mt-[4px] sm:mt-0">
              <Image src={vixLogo} alt="Vix vixLogo" priority={true} />
            </a>
          </Link>
          <div className="flex items-center ml-10 font-bold">
            <p className="text-white hidden sm:block">
              Playlist management on steroids
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          {session ? (
            <div className="flex items-center">
              {!loading && (
                <Link href="/myPlaylist">
                  <a
                    className={`text-white mr-4 font-bold border-b-2 ${
                      router.asPath === "/myPlaylist"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    My Playlists
                  </a>
                </Link>
              )}
              <button
                onClick={() => signOut("google")}
                className="bg-red-500 hover:bg-transparent border-solid	 hover:bg-red-700  text-white font-bold 
                py-2 px-4 rounded cursor-pointer"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <a
                className={`bg-blue-600 hover:bg-transparent border-solid	 hover:bg-blue-800  text-white font-bold 
              py-2  px-4 rounded cursor-pointer ${
                router.asPath === "/login" && "hidden"
              }`}
              >
                Login
              </a>
            </Link>
          )}
        </div>
        <nav className="sm:hidden">
          <div className="flex items-center">
            <button
              className="bg-white hover:bg-gray-100 text-gray-500 font-semibold hover:text-gray-700 py-2 px-4 border border-gray-400 hover:border-transparent rounded"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      <nav
        className={` ${
          open ? "block" : "hidden"
        } sm:hidden bg-blue-600 fixed right-0 w-[100%] h-screen	p-10 top-0 rounded shadow-md z-50`}
      >
        <div className="flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center justify-center">
            <li className="mt-5">
              <Link href="/">
                <a className="text-white text-lg font-bold max-w-[100px]">
                  <Image src={vixLogo} alt="Vix vixLogo" priority={true} />
                </a>
              </Link>
            </li>
            <li className="mt-5">
              <Link href="/">
                <a className="text-white text-lg font-bold max-w-[120px] sm:max-w-[250px] ">
                  Home
                </a>
              </Link>
            </li>
            <li className="mt-5">
              {!loading && (
                <Link href="/myPlaylist">
                  <a
                    className={`text-white mr-4 font-bold border-b-2 ${
                      router.asPath === "/myPlaylist"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    My Playlists
                  </a>
                </Link>
              )}
            </li>
            <li className="mt-5">
              <a
                className="text-white text-lg font-bold max-w-[120px] sm:max-w-[250px]"
                onClick={() => setOpen(false)}
              >
                Close menu
              </a>
            </li>
            {session ? (
              <>
                <li className="mt-5">
                  <button
                    onClick={() => signOut("google")}
                    className="bg-red-500 hover:bg-transparent border-solid	 hover:bg-red-700  text-white font-bold 
                py-2 px-4 rounded cursor-pointer"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li className="mt-5">
                <Link href="/login">
                  <a
                    className={`bg-blue-600 hover:bg-transparent border-solid	 hover:bg-blue-800  text-white font-bold 
              py-2  px-4 rounded cursor-pointer ${
                router.asPath === "/login" && "hidden"
              }`}
                  >
                    Login
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
