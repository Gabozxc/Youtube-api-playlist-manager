import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let idPlaylist;
let error;

const deletePlaylist = async () => {
  const response = await axios
    .delete(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${idPlaylist}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .catch((error) => {
      return (error = error.response?.data);
    });

  if (error) return error;

  return response.data;
};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });

  idPlaylist = req.body.idPlaylist;

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await deletePlaylist();

  if (error) return res.status(400).json(data);
    
  res.status(200).json(data);
};

export default requestYoutube;
