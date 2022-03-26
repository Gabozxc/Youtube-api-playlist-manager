import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useDispatch } from "react-redux";

import useCheckSession from "../../hooks/useCheckSession";

import { Layout, BoxVideosPlaylist, Loading } from "../../components/root";

export async function getServerSideProps({ req, query }) {
  const secret = process.env.SECRET;
  const session = await getSession({ req });
  const token = await getToken({ req, secret, encryption: true });

  const id = query.id;

  if (token && session) {
    const { data } = await axios.post(
      `${process.env.NEXTAUTH_URL}/api/YoutubeApi/getPlaylistSongs`,
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

export default function Playlist({ data, id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOADING_PAGE_SUCCESS" });
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  const session = useCheckSession();

  if (!session) {
    return <h2>Without Session</h2>;
  }

  return (
    <Layout>
      <div className="titulo-search flex items-center justify-start flex-wrap mt-10 ml-4">
        <h2 className="mt-3 ml-1 sm:mt-0 sm:ml-7 mb-5 font-bold text-xl">
          You have {data?.length} videos:
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center mr-[10vw] mt-5">
          <Loading />
        </div>
      ) : (
        <BoxVideosPlaylist
          videos={data}
          idPlaylist={id}
          setLoading={setLoading}
        />
      )}
    </Layout>
  );
}
