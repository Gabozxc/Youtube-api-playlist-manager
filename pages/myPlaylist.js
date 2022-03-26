import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { DownloadUserData } from "../actions/ActionsYT";
import { Layout, PlayListTable } from "../components/root";

export default function MyPlaylist() {
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

  if (!session) {
    return (
      <Layout>
        <h2 className="text-center mt-5">Without Session</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <PlayListTable />
    </Layout>
  );
}
