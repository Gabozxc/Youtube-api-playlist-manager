import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from "react-redux";

import useCheckSession from "../../hooks/useCheckSession";

import {
  Layout,
  BoxVideosPlaylist,
  Loading,
} from "../../components/root";

export default function Playlist() {

  const session = useCheckSession();

  const { playListObject, loading } = useSelector((state) => state.youtubeApi);
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => { 
    playListObject.find((object) => {
      if (object.playlist.id === id) {
        setVideos(object.videos.items ? object.videos.items : object.videos);
      }
    });
  }  , [playListObject, id]);


  if (!session) {
    return (
      <Layout>
        <h2>Without Session</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="titulo-search flex items-center justify-start flex-wrap mt-5 ml-2">
        <h2 className="mt-3 ml-1 sm:mt-0 sm:ml-7 mb-5 font-bold text-xl">
          You have {videos.length} videos in this playlist
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center mr-[10vw] mt-5">
          <Loading />
        </div>
      ) : (
        <BoxVideosPlaylist 
          videos={videos}
          idPlaylist={id}
        />
      )}
    </Layout>
  );
}
