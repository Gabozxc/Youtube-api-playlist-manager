import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let idVideos;
let idPlaylists;
let error;

const addYoutubeVideoPlaylist = async () => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}`;
  let data;

  for (let i = 0; i < idPlaylists.length; i++) {
    for (let j = 0; j < idVideos.length; j++) {
      const datas = {
        snippet: {
          playlistId: idPlaylists[i],
          resourceId: {
            kind: "youtube#video",
            videoId: idVideos[j].id.videoId,
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

      data = await axios(options).catch((err) => {
        return (error = err.response?.data);
      });
    }
  }

  if (error) return error;

  return data.data;
};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });

  idVideos = req.body.videos;
  idPlaylists = req.body.playlists;

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
