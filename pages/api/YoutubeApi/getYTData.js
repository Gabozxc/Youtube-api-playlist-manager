import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;

const getYTData = async (pageToken = "") => {

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlists?mine=true&pageToken=${pageToken}&maxResults=50&part=snippet`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (data?.nextPageToken) {
    return data.items.concat(await getYTData(data.nextPageToken));
  }

  return data.items;
  
};

const requestYoutube = async (req, res) => {

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await getYTData();

  res.status(200).json(data);

};

export default requestYoutube;
