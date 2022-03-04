import { useState, useEffect } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import { useRouter } from "next/router";

import ListPlayList from "../ListPlaylist";
import Loading from "../Loading";
import NewPlayListModal from "../newPlayListModal";
import { itemTypes } from "../types/itemTypes";

const SideBarList = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [subsList, setSubsList] = useState([]);

  const [{ canDrop }] = useDrop(() => ({
    accept: itemTypes.BOX,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

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
  }, [loading, subsList]);

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
      <ul>
        <li className="mb-5 text-white font-bold">PLAYLISTS:</li>
        {loading ? (
          <div className="ml-[10px]">
            <Loading />
          </div>
        ) : (
          subsList.map((sub) => (
            <ListPlayList
              sub={sub}
              key={sub.id}
              actualPage={router?.query.id === sub.id && true}
              setLoading={setLoading}
            />
          ))
        )}
      </ul>
      <NewPlayListModal
        modal={modal}
        setModal={setModal}
        setLoading={setLoading}
        subsList={subsList}
        setSubsList={setSubsList}
      />
    </aside>
  );
};

export default SideBarList;
