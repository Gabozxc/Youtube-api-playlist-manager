import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let idVideo;
let idPlaylist;

const addYoutubeVideoPlaylist = async () => {
  console.log(`El video es ${idVideo} y la playlist es ${idPlaylist}`);

  const { data } = await axios.post(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: "snippet",
        key: process.env.YOUTUBE_API_KEY,
        snippet: {
            playlistId: idPlaylist,
            resourceId: {
                kind: "youtube#video",
                videoId: idVideo,
            },
        },
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (data?.nextPageToken) {
    return data.items.concat(await addYoutubeVideoPlaylist(data.nextPageToken));
  }

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
  console.log(accessToken)


  const data = await addYoutubeVideoPlaylist();

  res.status(200).json(data);
};

export default requestYoutube;
