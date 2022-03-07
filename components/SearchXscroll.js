import { useState, useEffect } from "react";
import axios from "axios";

import PreviewVideoFounded from "./PreviewVideoFounded";
import Loading from "./Loading";

const SearchXscroll = () => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

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
    <section className="mt-5 max-w-[90%] my-0 mx-auto">
      <nav className="flex justify-center items-center field-input">
        <div className="relative mr-6 my-2">
          <input
            type="search"
            className="bg-purple-white shadow rounded border-0 p-3"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.code === "Enter" && setSearching(true)}
          />
        </div>
        <button
          className="bg-blue-500 border-solid hover:bg-blue-700 text-white font-bold px-4 min-h-[48px] rounded cursor-pointer"
          onClick={(e) => {
            e.preventDefault(), setSearching(true);
          }}
        >
          Search Video
        </button>
      </nav>
      {searching ? (
        <div className="flex justify-center mr-[10vw] mt-5">
          <Loading />
        </div>
      ) : (
        <>
          <div className="titulo-search flex items-center justify-start flex-wrap">
            <h2
              className={`ml-7 font-bold text-xl ${
                results.length <= 0 && "hidden"
              }`}
            >
              SEARCH RESULTS:
            </h2>
          </div>
          <div className="flex items-baseline justify-center flex-wrap overflow-y-scroll max-h-[350px]">
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
