import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let user;

const getYTData = async (pageToken = "") => {
  let error;

  const response = await axios
    .get(
      `https://www.googleapis.com/youtube/v3/playlists?mine=true&pageToken=${pageToken}&maxResults=50&part=snippet`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .catch((err) => {
      //save error
      console.log(err.response.data);
      error = {
        error: err.response.data,
        user: user,
        token: accessToken,
      };
    });

  if (error) {
    return error;
  }

  return response.data.items;
};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });
  user = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await getYTData();

  if (data.error) {
    console.log(data);
    return res.json(data);
  }

  res.status(200).json(data);
};

export default requestYoutube;
