import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Layout, BoxVideoPlaylist, Search } from "../../components/root";

export default function Playlist() {

  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [subsList, setSubsList] = useState([]);

  useEffect(() => {
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
  }, [loading, id]);

  if(id === undefined) {
    return (<div>Error</div>)
  }

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <Search />
        <div className="pl-10">
          <h2 className="font-bold text-xl text-left ml-7 mt-10">
            Your videos
          </h2>
          <BoxVideoPlaylist subsList={subsList} loading={loading} idPlaylist={id} setLoading={setLoading}/>
        </div>
      </DndProvider>
      <button
        className="bg-blue-500 border-solid ml-14 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => setLoading(true)}
      >
        Refresh
      </button>
    </Layout>
  );
}
