import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Layout, BoxVideoPlaylist, SearchXscroll } from "../../components/root";

export async function getServerSideProps(context) {
  return {
    props: {
      idUrl: context.query.id,
    },
  };
}

export default function Playlist({ idUrl }) {

  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [subsList, setSubsList] = useState([]);
  const [oldUrl, setoldUrl] = useState(id);

  useEffect(() => {
    if (id && idUrl) {
      if (oldUrl !== idUrl) {
        setLoading(true);
      }
    }

    const getYTData = async () => {
      if (loading && id !== undefined) {
        try {
          const { data } = await axios.post("/api/getPlaylistSongs", {
            withCredentials: true,
          });
          setLoading(false);
          setSubsList(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getYTData();
  }, [loading, id, idUrl, oldUrl]);

  if (id === undefined) {
    return <div>Error</div>;
  }

  return (
    <Layout>
      <SearchXscroll />
      <DndProvider backend={HTML5Backend}>
        <div className="">
          <div className="titulo-search flex items-center justify-start flex-wrap">
            <h2 className="ml-7 font-bold text-xl">Your Videos:</h2>
          </div>
          <BoxVideoPlaylist
            subsList={subsList}
            loading={loading}
            idPlaylist={id}
            setLoading={setLoading}
          />
        </div>
      </DndProvider>
    </Layout>
  );
}
