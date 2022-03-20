import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let q;
let error;

const getVideosYT = async () => {

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search`,
    {
      params: {
        part: "snippet",
        maxResults: "50",
        q,
        key: process.env.YOUTUBE_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).catch(err => {
    return error = err.response?.data
  })

  if (error) return error;

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

  if (error) return res.status(400).json(data);

  return res.status(200).json(data);

};

export default requestYoutube;
