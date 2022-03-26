import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import Loading from "./Loading";
import NewPlayListModal from "./NewPlayListModal";
import UpdatePlaylistModal from "./UpdatePlaylistModal";

const PlayListTable = () => {
  const dispatch = useDispatch();
  const { playListObject, loading } = useSelector((state) => state.youtubeApi);

  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [playlistSelect, setPlaylistSelect] = useState([]);

  const editPlaylist = (object) => {
    setPlaylistSelect(object.playlist);
    setModalUpdate(true);
  };

  const loadingPage = () => {
    dispatch({ type: "LOADING_PAGE" });
  };

  return (
    <section
      className={`antialiased text-gray-600 my-4 px-4 min-h-[250px] ${
        loading && "flex justify-center mt-5"
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Name of Playlist
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Type</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100 ">
                    {playListObject?.map((object) => (
                      <tr key={object.playlist.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            <Link href={`/playlist/${object.playlist.id}`}>
                              <a
                                className="hover:text-gray-900"
                                onClick={loadingPage}
                              >
                                {object.playlist.snippet.title}
                              </a>
                            </Link>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            {object.playlist.kind}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center ">
                            <p
                              className="cursor-pointer"
                              onClick={() => editPlaylist(object)}
                            >
                              ✏︎
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="hover:bg-blue-700 border-solid bg-blue-600 text-white font-bold px-2 min-h-[48px] rounded cursor-pointer mb-5 ml-2"
              onClick={() => setModal(true)}
            >
              Create a playlist
            </button>
          </div>
        </div>
      )}
      <NewPlayListModal modal={modal} setModal={setModal} />
      {modalUpdate && (
        <UpdatePlaylistModal
          modal={modalUpdate}
          setModal={setModalUpdate}
          playlistSelect={playlistSelect}
        />
      )}
    </section>
  );
};

export default PlayListTable;
