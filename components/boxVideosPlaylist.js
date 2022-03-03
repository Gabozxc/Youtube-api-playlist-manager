import axios from "axios";
import { useDrop } from "react-dnd";

import { itemTypes } from "./itemTypes";
import PreviewVideo from "./PreviewVideo";

const BoxVideosPlaylist = ({ videos, setLoading, idPlaylist }) => {

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: itemTypes.BOX,
    drop: async (e) => (
      setLoading(true),
      await axios.post("/api/addYoutubeVideoPlaylist", {
        withCredentials: true,
        idPlaylist: idPlaylist,
        idVideo: e.idVideo,
      }),
      setLoading("add")
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [idPlaylist, setLoading]);

  return (
    <section
      ref={drop}
      role={"boxVideos"}
      className={` ${
        canDrop ? "border-blue-500  " : "rounded-lg  "
      } border flex items-baseline justify-center flex-wrap rounded-lg w-[95%] my-0 mx-auto mb-5`}
    >
      {videos.length > 0 &&
        videos?.map((sub) => (
          <PreviewVideo
            key={sub.id}
            title={sub.snippet.title}
            url={sub.snippet?.thumbnails?.high?.url}
          />
        ))}
    </section>
  );
};

export default BoxVideosPlaylist;
