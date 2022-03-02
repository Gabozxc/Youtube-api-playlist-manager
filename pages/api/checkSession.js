import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;

const requestYoutube = async (req, res) => {
  
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  if (session) {
    try {
      await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );
    } catch (err) {
      //get code from the error
      const code = err.response.status;
      //if code is 401, the user is not authenticated
      if (code === 401 || err.response.data.error === "invalid_token") {
        return res.status(200).json({ token: false });
      }
    }
  }
  return res.status(200).json({ token: true });
};

export default requestYoutube;
