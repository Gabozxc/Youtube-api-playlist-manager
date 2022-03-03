import { useState, useEffect } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";

import { itemTypes } from "./itemTypes";
import PreviewVideo from "./PreviewVideo";

const BoxVideosPlaylist = ({ videos, idPlaylist, setLoading }) => {

  const [videosPage, setVideos] = useState([])

  useEffect(() => {
    if(videosPage === []){
      setVideos(videos)
    }
  }, [videosPage,videos, idPlaylist])

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: itemTypes.BOX,
      drop: async (e) => (
        setLoading(true),
        await axios.post("/api/addYoutubeVideoPlaylist", {
          withCredentials: true,
          idPlaylist: idPlaylist,
          idVideo: e.idVideo,
        }),
        videos.push(e.video),
        setLoading(false)
      ),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [idPlaylist, setLoading]
  );

  return (
    <section
      ref={drop}
      role={"boxVideos"}
      className={` ${
        canDrop ? "border-blue-500  " : "rounded-lg  "
      } border flex items-end justify-center flex-wrap rounded-lg w-[95%] my-0 mx-auto mb-5 min-h-[250px]`}
    >
      {videosPage.length > 0 &&
        videosPage?.map((sub, index) => (
          <PreviewVideo
            key={sub.id}
            title={sub.snippet.title}
            url={sub.snippet?.thumbnails?.high?.url}
            id={sub.id}
            videos={videosPage}
            setVideos={setVideos}
            setLoading={setLoading}
          />
        ))}
    </section>
  );
};

export default BoxVideosPlaylist;
