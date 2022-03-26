import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { DownloadUserData } from "../actions/ActionsYT";
import { Layout, SearchXscroll, Loading } from "../components/root";

export default function Home() {
  const dispatch = useDispatch();
  const { logIn } = useSelector((state) => state.youtubeApi);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && logIn === false) {
      dispatch(DownloadUserData());
    }
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [dispatch, session, logIn]);

  return (
    <Layout>
      {!session && (
        <div className="flex justify-center flex-col items-center bg-blue-600 my-0 mx-auto max-w-[90%] sm:max-w-[50%] mt-10 p-5 rounded shadow-md	">
          <h1 className="text-xl font-bold text-white mb-2">Vixfid </h1>
          <h2 className="text-white mb-2">
            In Vixfid we seek to improve your experience managing your youtube
            playlists. To do this we synchronize your account with google
            account so that the application has access to that data and you can
            start using the application.
          </h2>
          <h2 className="text-white mb-2">
            The application does not store any sensitive information, we only
            access the data necessary to manage your youtube playlist.
          </h2>
        </div>
      )}
      <div className="flex justify-center mt-5">
        {session && <>{<Loading /> && <SearchXscroll />}</>}
      </div>
    </Layout>
  );
}
