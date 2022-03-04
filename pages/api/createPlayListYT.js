import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let newPlaylist;

const createPlayListYT = async () => {

  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,status&key=${process.env.YOUTUBE_API_KEY}`;

  const res = await axios.post(url, {
    snippet: {
      title: newPlaylist.title,
      description: newPlaylist.description,
    },
    status: {
      privacyStatus: newPlaylist.privacyStatus,
    },
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return res.data

};

const requestYoutube = async (req, res) => {

  const session = await getSession({ req });

  newPlaylist = {
    title: req.query.title,
    description: req.query.description,
    privacyStatus: req.query.privacyStatus,
  };

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await createPlayListYT();

  res.status(200).json(data);

};

export default requestYoutube;
