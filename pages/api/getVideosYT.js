import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let q;

const getVideosYT = async () => {

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search`,
    {
      params: {
        part: "snippet",
        maxResults: "10",
        q,
        key: process.env.YOUTUBE_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.items;
};

const requestYoutube = async (req, res) => {
  
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  q = req.body.qSearch;
  accessToken = token.accessToken;

  const data = await getVideosYT();

  return res.status(200).json(data);

};

export default requestYoutube;
