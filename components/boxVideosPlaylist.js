import axios from "axios";
import { useDrop } from "react-dnd";

import { itemTypes } from "./itemTypes";
import PreviewVideo from "./PreviewVideo";

const BoxVideosPlaylist = ({ subsList, loading, idPlaylist, setLoading }) => {

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: itemTypes.BOX,
    drop: async (e) => (
      console.log(idPlaylist),
      await axios.post("/api/addYoutubeVideoPlaylist", {
        withCredentials: true,
        idPlaylist,
        idVideo: e.idVideo,
      }),
      setLoading(true)
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <section
      ref={drop}
      role={"boxVideos"}
      className={` ${
        isActive ? "border-blue-500 rounded-lg" : "border-transparent"
      } border flex flex-row flex-wrap justify-start`}
    >
      {subsList.length > 0 &&
        subsList?.map((sub) => (
          <PreviewVideo
            key={sub.id}
            title={sub.snippet.title}
            url={sub.snippet?.thumbnails?.high?.url}
          />
        ))}
      {loading && <p>Loading...</p>}
    </section>
  );
};

export default BoxVideosPlaylist;
