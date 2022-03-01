import axios from "axios";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import {
  Layout,
  BoxVideosPlaylist,
  SearchXscroll,
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

  if (session === false) {
    return <h2>Without Session</h2>;
  }

  return (
    <Layout>
      <SearchXscroll />
      <DndProvider backend={HTML5Backend}>
        <div className="">
          <div className="titulo-search flex items-center justify-start flex-wrap">
            <h2 className="ml-7 font-bold text-xl">Your Videos:</h2>
          </div>
          <BoxVideosPlaylist
            subsList={data}
            loading={loading}
            idPlaylist={id}
            setLoading={setLoading}
          />
        </div>
      </DndProvider>
    </Layout>
  );
}
