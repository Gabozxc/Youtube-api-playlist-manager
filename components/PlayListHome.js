import axios from "axios";
import { useState, useEffect } from "react";

import PreviewPlaylist from "./PreviewPlaylist";

export default function PlayListHome() {
  
  const [loading, setLoading] = useState(true);
  const [subsList, setSubsList] = useState([]);

  useEffect(() => {
    const getYTData = async () => {
      if (loading) {
        const { data } = await axios.get("/api/getYTData", {
          withCredentials: true,
        });
        setLoading(false);
        setSubsList(data);
      }
    };
    getYTData();
  }, [loading]);
  
  return (
    <>
      <div className="pl-10 text-center">
        <section className="flex flex-row flex-wrap justify-start">
          {subsList.map((sub) => (
            <PreviewPlaylist
              key={sub.id}
              title={sub.snippet.title}
              url={sub.snippet.thumbnails.high.url}
              id={sub.id}
            />
          ))}
        </section>
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}
