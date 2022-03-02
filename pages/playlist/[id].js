import { useEffect, useState } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import {
  Layout,
  BoxVideosPlaylist,
  SearchXscroll,
  Loading,
} from "../../components/root";

export async function getServerSideProps({ req, query }) {
  const secret = process.env.SECRET;

  const session = await getSession({ req });
  const token = await getToken({ req, secret, encryption: true });

  const id = query.id;

  if (token && session) {
    const { data } = await axios.post(
      `${process.env.NEXTAUTH_URL}/api/getPlaylistSongs`,
      {
        withCredentials: true,
        id,
        token,
      }
    );
    return {
      props: {
        id,
        session: session,
        data,
      },
    };
  }

  return {
    props: {
      session: false,
    },
  };
}

export default function Playlist({ id, session, data }) {

  const [loading, setLoading] = useState(false);
  const [idplay, setId] = useState(id)

  useEffect(() => {
    setId(id)
  }, [idplay, id])

  if (session === false) {
    return <h2>Without Session</h2>;
  }

  return (
    <Layout>
      <SearchXscroll />
      <DndProvider backend={HTML5Backend}>
          <div className="titulo-search flex items-center justify-start flex-wrap">
            <h2 className="ml-7 mb-5 font-bold text-xl">Your Videos:</h2>
          </div>

          {loading ? (
            <div className="flex justify-center mr-[10vw] mt-5">
              <Loading />
            </div>
          ) : (
            <>
              <BoxVideosPlaylist
                subsList={data}
                loading={loading}
                idPlaylist={idplay}
                setLoading={setLoading}
              />
            </>
          )}
      </DndProvider>
    </Layout>
  );
}
