import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let idVideo;
let error;

const deleteVideoFromPlaylist = async () => {

  const response = await axios
    .delete(`https://www.googleapis.com/youtube/v3/playlistItems`, {
      params: {
        part: "snippet",
        id: idVideo,
        key: process.env.YOUTUBE_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((err) => {
      return (error = err.response?.data);
    });

  if (error) return error;

  return response.data;

};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });

  idVideo = req.body.idVideo;

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await deleteVideoFromPlaylist();

  if (error) return res.status(400).json(data);

  res.status(200).json(data);
};

export default requestYoutube;
