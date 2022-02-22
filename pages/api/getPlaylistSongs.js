import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let playlistId;

const getPlayListSong = async () => {

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: "snippet",
        maxResults: "50",
        playlistId,
        key: process.env.YOUTUBE_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (data?.nextPageToken) {
    return data.items.concat(await getPlayListSong(data.nextPageToken));
  }

  return data.items;

};

const requestYoutube = async (req, res) => {
  
  const session = await getSession({ req });
  const urlConfig = req.headers.referer.substring(
    req.headers.referer.lastIndexOf("/"),
    req.headers.referer.length
  );
  const url = urlConfig.replace(/\//g, '');

  playlistId = url;

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  try {
    const data = await getPlayListSong();
    res.status(200).json(data);
  }catch(err){
    res.status(200).json(err);
  }
  

};

export default requestYoutube;
