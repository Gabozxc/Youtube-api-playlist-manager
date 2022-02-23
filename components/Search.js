import { useState, useEffect } from "react";
import axios from "axios";
import PreviewVideo from "./PreviewVideo";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getYTData = async () => {
      if (searching) {
        try {
          const { data } = await axios.post("/api/getVideosYT", {
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
    <section>
      <div className="flex justify-center items-center">
        <div className="relative mr-6 my-2">
          <input
            type="search"
            className="bg-purple-white shadow rounded border-0 p-3"
            placeholder="Search by name..."
            value={search}
            
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 border-solid hover:bg-blue-700 text-white font-bold px-4 min-h-[48px] rounded cursor-pointer"
          onClick={() => setSearching(true)}
        >
          Search Video
        </button>
      </div>
      {searching ? (
        <p>Loading....</p>
      ) : (
        <>
          <h2 className={`ml-7 font-bold text-xl ${results.length <= 0 && 'hidden'}`} >Search results</h2>
          <div className="bg-gray-100">
            <div className="flex overflow-x-auto">
              <div className="flex items-center justify-start flex-nowrap">
                {results.length > 0 &&
                  results?.map((sub) => (
                    <PreviewVideo
                      key={sub.id.videoId}
                      title={sub.snippet.title}
                      url={sub.snippet?.thumbnails?.high?.url}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
