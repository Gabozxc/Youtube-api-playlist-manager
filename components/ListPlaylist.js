import {useState} from "react"
import axios from "axios";
import Link from "next/link";
import { useDrop } from "react-dnd";

import { itemTypes } from "./types/itemTypes";
import UpdatePlaylistModal from "./UpdatePlaylistModal";

const ListPlaylist = ({ sub, actualPage }) => {

  const [edit, setEdit] = useState(false);

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
    <li className="mb-2 flex justify-between">
      <Link href={`/playlist/${sub.id}`}>
        <a
          className={`w-100 inline-block text-white ${isActive && "text-green-500"} ${actualPage && "font-bold"}`}
          ref={drop}
          role={"boxVideos"}
          id={sub.id}
        >
          {sub.snippet.title}
        </a>
      </Link>
      <div>
        <span className="cursor-pointer" onClick={() => setEdit(true)}>✏️</span>
      </div>
      {edit && <UpdatePlaylistModal sub={sub} setEdit={setEdit} modal={edit} setModal={setEdit}/>}
    </li>
  );
};

export default ListPlaylist;
