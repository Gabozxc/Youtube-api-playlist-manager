import Image from "next/image";
import {useDispatch} from "react-redux";
import {DeleteVideoFromPlaylist} from "../actions/ActionsYT";

const PreviewVideo = ({ title, url, idPlaylist, idVideo }) => {

  const dispatch = useDispatch();

  const deleteVideoFromPlaylist = async () => {
    dispatch(DeleteVideoFromPlaylist(idVideo, idPlaylist));
  };

  return (
    <div className="overflow-hidden bg-red-500hover:bg-gray-200 flex flex-col rounded-lg relative group sm:ml-0 w-[150px] ml-1 sm:w-[250px] sm:m-5 sm:p-2">
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
        onClick={deleteVideoFromPlaylist}
        className="bg-red-500 hover:bg-transparent border-solid hover:bg-red-700 text-white font-bold py-2 px-1 rounded cursor-pointer hidden pointer-events-none mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:block group-hover:pointer-events-auto w-[120px] sm:w-[200px] "
      >
        Delete from the playlist
      </button>
      <h2 className="mb-4 mt-4 font-bold">{title}</h2>
    </div>
  );
};

export default PreviewVideo;
