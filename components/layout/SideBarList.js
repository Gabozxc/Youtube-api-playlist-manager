import { useState } from "react";
import { useDrop } from "react-dnd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import ListPlayList from "../ListPlaylist";
import Loading from "../Loading";
import NewPlayListModal from "../NewPlayListModal";
import { itemTypes } from "../types/itemTypes";

const SideBarList = () => {
  
  const router = useRouter();
  const { playLists, loading } = useSelector((state) => state.youtubeApi);

  const [modal, setModal] = useState(false);
  const [subsList, setSubsList] = useState([]);

  const [{ canDrop }] = useDrop(() => ({
    accept: itemTypes.BOX,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <aside
      className={`p-5 pb-5 min-w-[188px] ${
        !canDrop ? "bg-blue-500" : "bg-blue-600"
      }`}
    >
      <button
        className="hover:bg-blue-700 border-solid bg-blue-600 text-white font-bold px-2 min-h-[48px] rounded cursor-pointer mb-5"
        onClick={() => setModal(true)}
      >
        Create a playlist
      </button>
      <ul className="h-[435px] max-h-[435px] overflow-hidden  overflow-y-auto">
        <li className="mb-5 text-white font-bold">PLAYLISTS:</li>
        {loading ? (
          <div className="ml-[10px]">
            <Loading />
          </div>
        ) : (
          playLists.map((sub) => (
            <ListPlayList
              sub={sub}
              key={sub.id}
              actualPage={router?.query.id === sub.id && true}
            />
          ))
        )}
      </ul>
      <NewPlayListModal modal={modal} setModal={setModal} />
    </aside>
  );
};

export default SideBarList;
