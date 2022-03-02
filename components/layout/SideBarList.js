import { useState, useEffect } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import { useRouter } from "next/router";

import ListPlayList from "../ListPlaylist";
import Loading from "../Loading";
import { itemTypes } from "../itemTypes";


const SideBarList = () => {

  const [loading, setLoading] = useState(true);
  const [subsList, setSubsList] = useState([]);
  const router = useRouter()

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

  }, [loading]);

  return (
    <aside className={`p-5 pb-5 min-w-[188px] ${!canDrop ? "bg-blue-500" : "bg-blue-600"}`}>
      <ul>
        <li className="mb-5 text-white font-bold">PLAYLISTS:</li>
        {subsList.map((sub) => (
          <ListPlayList sub={sub} key={sub.id} actualPage={router?.query.id === sub.id && true}/>
        ))}
        {loading ? <div className="ml-[10px]"><Loading /></div> : ""}
      </ul>
    </aside>
  );
};

export default SideBarList;
