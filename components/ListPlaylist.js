import axios from "axios";
import Link from "next/link";
import { useDrop } from "react-dnd";

import { itemTypes } from "./itemTypes";

const ListPlaylist = ({ sub }) => {
    
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: itemTypes.BOX,
    drop: async (e) =>
      await axios.post("/api/addYoutubeVideoPlaylist", {
        withCredentials: true,
        idPlaylist: sub.id,
        idVideo: e.idVideo,
      }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <li className="mb-2">
      <Link href={`/playlist/${sub.id}`}>
        <a
          className={`w-100 inline-block text-white ${isActive && "text-green-500"}`}
          ref={drop}
          role={"boxVideos"}
          id={sub.id}
        >
          {sub.snippet.title}
        </a>
      </Link>
    </li>
  );
};

export default ListPlaylist;
