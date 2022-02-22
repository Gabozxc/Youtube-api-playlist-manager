import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-500 p-5 mb-5">
      <div className="flex justify-between items-center	">
        <Link  href="/" ><a className="text-white text-lg font-bold">Playlist Manager</a></Link>
        <div className="">
          {session && (
            <>
              <button
                onClick={() => signOut("google")}
                className="bg-red-500 hover:bg-transparent border-solid	 hover:bg-red-700  text-white font-bold 
                py-2 px-4 rounded cursor-pointer"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
