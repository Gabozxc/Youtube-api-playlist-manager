import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let idVideo;
let idPlaylist;
let error;

const addYoutubeVideoPlaylist = async () => {
  //PlaylistItems API request to add video to a playlist
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}`;

  const datas = {
    snippet: {
      playlistId: idPlaylist,
      resourceId: {
        kind: "youtube#video",
        videoId: idVideo,
      },
    },
  };

  const options = {
    method: "POST",
    url: url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: datas,
  };

  const data = await axios(options).catch((err) => {
    //get error
    return (error = err.response?.data);
  });

  if (error) return error;

  return data.items;
};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });

  idVideo = req.body.idVideo;
  idPlaylist = req.body.idPlaylist;

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await addYoutubeVideoPlaylist();

  if (error) return res.status(400).json(data);
    
  res.status(200).json(data);
};

export default requestYoutube;
