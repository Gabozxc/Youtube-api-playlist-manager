import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let updatePlaylist;
let error;

const updatePlayListYT = async () => {
  //update the title and description of the playlist put
  const response = await axios.put(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=${process.env.YOUTUBE_API_KEY}`,
    {
      id: updatePlaylist.idPlaylist,
      snippet: {
        title: updatePlaylist.title,
        description: updatePlaylist.description,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).catch(err => {
    return error = err.response?.data;
  })

  if (error) return error;

  return response.data;
};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });

  updatePlaylist = {
    idPlaylist: req.body.idPlaylist,
    title: req.body.title,
    description: req.body.description,
  };

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await updatePlayListYT();

  if (error) return res.status(400).json(data);

  res.status(200).json(data);
};

export default requestYoutube;
