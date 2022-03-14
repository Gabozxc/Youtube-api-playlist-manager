import { useState, useEffect } from "react";
import axios from "axios";

import PreviewVideoFounded from "./PreviewVideoFounded";
import Loading from "./Loading";

const SearchXscroll = ({ indexPage }) => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  const tooltipMessage = indexPage
    ? "You can drag and drop the videos you want into the list you want, by their name in the sidebar or in the playlist box below"
    : "You can drag and drop the videos you want into the list you want, by their name in the sidebar.";

  useEffect(() => {
    const getYTData = async () => {
      if (searching) {
        try {
          const { data } = await axios.post("/api/YoutubeApi/getVideosYT", {
            withCredentials: true,
            qSearch: search,
          });
          setSearching(false);
          setResults(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getYTData();
  }, [searching, search]);

  return (
    <section className="mt-5 max-w-[150px] sm:max-w-[90%] y-0 mx-auto ">
      <form
        className="flex justify-center items-center field-input"
        onSubmit={(e) => {
          e.preventDefault(), setSearching(true);
        }}
      >
        <div className="relative mx-auto flex items-center">
          {results.length > 0 && (
            <div className="hidden sm:block self bg-gray-600 rounded-full h-[20px] w-[20px] relative right-5 shadow-md hover:bg-gray-900">
              <span
                className="text-xl text-white absolute top-[-5px] left-[7px] right-0 bottom-0"
                data-tip={tooltipMessage}
              >
                !
              </span>
            </div>
          )}
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
      {searching ? (
        <div className="flex justify-center mr-[10vw] mt-5">
          <Loading />
        </div>
      ) : (
        <>
          <div className="titulo-search flex items-center justify-start flex-wrap">
            <h2
              className={`mt-5 mb-3 sm:mt-0 sm:mb-3 ml-7 font-bold text-xl ${
                results.length <= 0 && "hidden"
              }`}
            >
              SEARCH RESULTS:
            </h2>
          </div>
          <div className="flex items-baseline justify-center flex-wrap overflow-y-scroll max-h-[350px] overflow-x-hidden">
            {results.length > 0 &&
              results?.map((sub) => (
                <PreviewVideoFounded
                  key={sub.etag}
                  title={sub.snippet.title}
                  url={sub.snippet?.thumbnails?.high?.url}
                  video={sub}
                />
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchXscroll;
