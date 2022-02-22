import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, PreviewVideo } from "../../components/root";

export default function Playlist() {
  
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [subsList, setSubsList] = useState([]);


  useEffect(() => {
    if(loading){
      const getYTData = async () => {
        if (id) {
          try {
            const { data } = await axios.post("/api/getPlaylistSongs", {
              withCredentials: true,
              id,
            });
            setLoading(false);
            setSubsList(data);
            console.log(data)
          } catch (err) {
            console.log(err);
          }
        }
      };
      getYTData();
    }
  }, [loading, id]);

  return (
    <Layout>
      <div className="pl-10 text-center">
        <button className="bg-blue-500 border-solid hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => setLoading(true)}>Refresh</button>
        <section className="flex flex-row flex-wrap justify-start">
          {subsList?.map((sub) => (
            <PreviewVideo
              key={sub.id}
              title={sub.snippet.title}
              url={sub.snippet?.thumbnails?.high?.url}
            />
          ))}
          {loading && <p>Loading...</p>}
        </section>
      </div>
    </Layout>
  );
}