import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, PreviewVideo, Search } from "../../components/root";

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

  return (
    <Layout>
      <Search />
      <div className="pl-10">
          <h2 className="font-bold text-xl text-left ml-7 mt-10">Your videos</h2>
        <section className="flex flex-row flex-wrap justify-start">
          {subsList.length > 0 && subsList?.map((sub) => (
            <PreviewVideo
              key={sub.id}
              title={sub.snippet.title}
              url={sub.snippet?.thumbnails?.high?.url}
            />
          ))}
          {loading && <p>Loading...</p>}
        </section>
      </div>
      <button className="bg-blue-500 border-solid ml-14 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => setLoading(true)}>Refresh</button>
    </Layout>
  );
}
