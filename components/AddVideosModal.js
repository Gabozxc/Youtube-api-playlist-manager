import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "./Loading";
import { AddVideos } from "../actions/ActionsYT";

const AddVideosModal = ({
  modal,
  modalOpen,
  videosSelect,
  setVideosSelect,
}) => {
  const dispatch = useDispatch();
  const { playListObject, loading } = useSelector((state) => state.youtubeApi);

  const [playlistSelect, setPlaylistSelect] = useState([]);

  const addVideos = async () => {
    await dispatch(AddVideos(videosSelect, playlistSelect));

    const checkboxes = document.querySelectorAll(".checkbox");

    setPlaylistSelect([]);
    setVideosSelect([]);

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    modalOpen()
  };

  const selectAll = () => {
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });

    const playlistsId = playLists.map((playlist) => playlist.id);

    setPlaylistSelect(playlistsId);
  };

  return (
    <section
      id="defaultModal"
      aria-hidden="true"
      className={`${!modal && "hidden"} fixed right-0 left-0 top-2 z-50 `}
    >
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto my-0 mx-auto mt-5">
        <div className="relative bg-blue-500 rounded-lg shadow-md">
          <div className="flex justify-between bg-blue-500 items-start p-5 rounded-t border-b dark:border-white">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Add videos
            </h3>

            <button
              type="button"
              className="text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="defaultModal"
              onClick={modalOpen}
            >
              X
            </button>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="flex justify-center items-center ">
                <h2 className="text-white mr-10">Wait a moment</h2>
                <Loading white />
              </div>
            ) : (
              <>
                <ul className="flex flex-col items-start overflow-y-scroll max-h-[40vh]">
                  {playListObject.length > 0 &&
                    playListObject.map((object) => (
                      <li
                        className="w-[90%] p-2 "
                        key={object.playlist.id + object.playlist.etag}
                      >
                        <div className="flex items-center justify-start">
                          <label
                            htmlFor={object.playlist.id}
                            name={object.playlist.id}
                            className="w-full rounded-full bg-blue-500 text-white p-2"
                          >
                            {object.playlist.snippet.title}
                          </label>
                          <input
                            type="checkbox"
                            id={object.playlist.id}
                            value={object.playlist.id}
                            className="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPlaylistSelect([
                                  ...playlistSelect,
                                  e.target.value,
                                ]);
                              } else {
                                setPlaylistSelect(
                                  playlistSelect.filter(
                                    (id) => id !== e.target.value
                                  )
                                );
                              }
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="flex justify-between p-5">
                  <button
                    type="button"
                    className="cursor-pointer bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={selectAll}
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={addVideos}
                  >
                    Add videos
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddVideosModal;
