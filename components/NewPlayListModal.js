import { useState } from "react";
import { useDispatch } from "react-redux";

import {NewPlayList} from "../actions/ActionsYT";

const NewPlayListModal = ({ modal, setModal }) => {

  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
    privacyStatus: "public",
  });

  const createPlaylist = async () => {
    dispatch(NewPlayList(playlist));
  };

  return (
    <section
      id="defaultModal"
      aria-hidden="true"
      className={`${
        !modal && "hidden"
      } overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0`}
    >
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto my-0 mx-auto mt-5">
        <div className="relative bg-blue-500 rounded-lg shadow-md">
          <div className="flex justify-between bg-blue-500 items-start p-5 rounded-t border-b dark:border-white">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Create new playlist
            </h3>
            <button
              type="button"
              className="text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="defaultModal"
              onClick={() => setModal(false)}
            >
              X
            </button>
          </div>
          <div className="p-5">
            <div className="mb-5">
              <label
                className="block text-gray-700 dark:text-white font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="bg-white appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                id="title"
                type="text"
                placeholder="Playlist Title"
                value={playlist.title}
                onChange={(e) =>
                  setPlaylist({ ...playlist, title: e.target.value })
                }
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 dark:text-white font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="bg-white appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                id="description"
                type="text"
                placeholder="Playlist Description"
                value={playlist.description}
                onChange={(e) =>
                  setPlaylist({ ...playlist, description: e.target.value })
                }
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 dark:text-white font-bold mb-2"
                htmlFor="privacyStatus"
              >
                Privacy Status
              </label>
              <select
                className="bg-white appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                id="privacyStatus"
                type="text"
                placeholder="Privacy Status"
                value={playlist.privacyStatus}
                onChange={(e) =>
                  setPlaylist({ ...playlist, privacyStatus: e.target.value })
                }
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end p-5">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={createPlaylist}
            >
              Create Playlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPlayListModal;
