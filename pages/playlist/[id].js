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
    const getYTData = async () => {
      if (loading) {
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
  }, [loading, id]);

  return (
    <Layout>
      <div className="pl-10 text-center">
        <section className="flex flex-row flex-wrap justify-start">
          {subsList?.map((sub) => (
            <PreviewVideo
              key={sub.id}
              title={sub.snippet.title}
              url={sub.snippet?.thumbnails?.high?.url}
              data={sub}
            />
          ))}
          {loading && <p>Loading...</p>}
        </section>
      </div>
    </Layout>
  );
}
