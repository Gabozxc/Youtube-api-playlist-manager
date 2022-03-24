import axios from "axios";
import { useDrop } from "react-dnd";

import { itemTypes } from "./types/itemTypes";
import PreviewVideo from "./PreviewVideo";

const BoxVideosPlaylist = ({ videos, idPlaylist }) => {
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: itemTypes.BOX,
      drop: async (e) => (
        await axios.post("/api/YoutubeApi/addYoutubeVideoPlaylist", {
          withCredentials: true,
          idPlaylist: idPlaylist,
          idVideo: e.idVideo,
        }),
        videos.push(e.video)
      ),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [idPlaylist]
  );

  return (
    <section
      ref={drop}
      role={"boxVideos"}
      className={` ${
        canDrop ? "sm:border-blue-500  " : "rounded-lg  "
      } sm:border flex sm:items-end justify-center flex-wrap rounded-lg w-[160px] mx-auto my-0 mb-5 min-h-[250px] sm:w-[95%]`}
    >
      {videos.length > 0 &&
        videos?.map((sub) => (
          <PreviewVideo
            key={sub.id}
            title={sub.snippet.title}
            url={sub.snippet?.thumbnails?.high?.url}
            idPlaylist={idPlaylist}
            idVideo={sub.id}
            videos={videos}
          />
        ))}
    </section>
  );
};

export default BoxVideosPlaylist;
