import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SearchVideo } from "../actions/ActionsYT";
import PreviewVideoFounded from "./PreviewVideoFounded";
import AddVideosModal from "./AddVideosModal";
import Loading from "./Loading";

const SearchXscroll = ({ indexPage }) => {
  const dispatch = useDispatch();
  const { loading, searchResults } = useSelector((state) => state.youtubeApi);

  const [search, setSearch] = useState("");
  const [videosSelect, setVideosSelect] = useState([]);
  const [modal, setModal] = useState(false);

  const SearchVideos = () => {
    dispatch(SearchVideo(search));
  };

  const modalOpen = () => {
    setModal(!modal);
  };

  return (
    <section className=" max-w-[150px] sm:max-w-[90%] y-0 mx-auto relative">
      <form
        className="flex justify-center items-center field-input"
        onSubmit={(e) => {
          e.preventDefault(), SearchVideos();
        }}
      >
        <div className="relative mx-auto flex items-center">
          <input
            type="search"
            className="bg-purple-white shadow rounded border-0 p-3 max-w-[150px] mr-1 "
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className="hidden sm:block bg-blue-500 border-solid hover:bg-blue-700 text-white font-bold px-4 min-h-[48px] rounded cursor-pointer"
            type="submit"
            value="Search Videos"
          />
        </div>
      </form>
      {loading ? (
        <div className="flex justify-center mr-[10vw] mt-5">
          <Loading />
        </div>
      ) : (
        <div className={`${searchResults.length === 0 && "hidden"}`}>
          <div className="titulo-search flex items-center justify-start flex-wrap">
            <h2 className="mt-5 mb-3 sm:mt-0 sm:mb-3 ml-7 font-bold text-xl">
              SEARCH RESULTS:
            </h2>
          </div>
          <div className="flex items-baseline justify-center flex-wrap overflow-y-scroll max-h-[350px] overflow-x-hidden">
            {searchResults.map((sub) => (
              <PreviewVideoFounded
                key={sub.etag}
                title={sub.snippet.title}
                url={sub.snippet?.thumbnails?.high?.url}
                video={sub}
                setVideoSelect={setVideosSelect}
                videoSelect={videosSelect}
              />
            ))}
          </div>
        </div>
      )}
      {videosSelect.length > 0 && (
        <section
          onClick={modalOpen}
          className="bg-blue-500 rounded-lg fixed bottom-1 right-5 p-5 cursor-pointer shadow-lg z-50"
        >
          <h2 className="font-bold text-xl text-white">
            SELECTED VIDEOS: {videosSelect.length}
          </h2>
        </section>
      )}
      <section className={modal ? "" : "hidden"}>
        <AddVideosModal
          modal={modal}
          modalOpen={modalOpen}
          videosSelect={videosSelect}
          setVideosSelect={setVideosSelect}
        />
      </section>
    </section>
  );
};

export default SearchXscroll;
