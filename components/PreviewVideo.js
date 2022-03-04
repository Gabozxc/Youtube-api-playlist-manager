import Image from "next/image";
import axios from "axios";

const PreviewVideo = ({ title, url, id, setLoading, videos }) => {
  const deleteVideoFromPlaylist = async (id) => {
    setLoading(true);
    await axios.post("/api/deleteVideoFromPlaylist", {
      withCredentials: true,
      idVideo: id,
    });
    //remove video from array
    const index = videos.findIndex((video) => video.id === id);
    videos.splice(index, 1);
    setLoading(false);
  };

  return (
    <div className="w-[250px] m-5 hover:bg-gray-200 p-2 flex flex-col rounded-lg relative group ">
      <h2 className="mb-4 mt-4 font-bold">{title}</h2>
      {url ? (
        <Image
          alt={title}
          src={url}
          width={480}
          height={360}
          className="object-cover w-100 h-100 rounded-lg"
        />
      ) : (
        ""
      )}
      <button
        onClick={(e) => deleteVideoFromPlaylist(e.target.id)}
        id={id}
        className="bg-red-500 hover:bg-transparent border-solid hover:bg-red-700 text-white font-bold py-2 px-1 rounded cursor-pointer w-[200px] opacity-0 pointer-events-none  mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        Delete from the playlist
      </button>
    </div>
  );
};

export default PreviewVideo;
