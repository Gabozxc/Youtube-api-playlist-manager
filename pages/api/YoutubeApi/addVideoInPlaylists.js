import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
let accessToken;
let idVideo;
let idPlaylists = [];

const addYoutubeVideoPlaylist = async () => {
  //add a video to several playlists at once with a single API request 

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}`;

    const data = {
        snippet: {
            playlistId: idPlaylists,
            resourceId: {
                kind: "youtube#video",
                videoId: idVideo
            }
        }
    }

    const response = await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;

};

const requestYoutube = async (req, res) => {
  const session = await getSession({ req });


  idVideo = req.body.idVideo;
  idPlaylist = req.body.idPlaylist;

  if (!session) {
    return res.status(401).end();
  }

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await addYoutubeVideoPlaylist();

  res.status(200).json(data);
};

export default requestYoutube;