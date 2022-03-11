import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import db from "../config/db";
import User from "../model/Usuario";

const secret = process.env.SECRET;
let accessToken;

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (session.user) {
    db.sync()
      .then(() => "Database synced!")
      .catch((error) => console.log(error));

    const user = await User.findOne({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      await User.create({
        email: session.user.email,
      });
    }
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  if (session) {
    try {
      await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );
    } catch (err) {
      const code = err?.response?.status;

      if (code >= 400 || err.response.data.error === "invalid_token") {
        return res.status(200).json({ token: false });
      }
    }
  }
  return res.status(200).json({ token: true });
};

export default requestYoutube;
