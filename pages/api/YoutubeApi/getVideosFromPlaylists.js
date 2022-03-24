import { getToken } from "next-auth/jwt";
import axios from "axios";

const secret = process.env.SECRET;
let accessToken;
let playlistIdArray;
let error;
let playlists = [];

const getPlayListSong = async (playlist, pageToken = "") => {
  if (playlist.id) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}`;

    const options = {
      method: "GET",
      url: url,
      params: {
        part: "snippet",
        maxResults: "50",
        playlistId: playlist.id,
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let { data } = await axios(options).catch((err) => {
      return (error = err.response?.data);
    });

    if (data?.nextPageToken) {
      return (playlists = [
        ...playlists,
        {
          playlist,
          videos: {
            ...data,
            items: data.items.concat(
              await otherPageVideos(playlist, data.nextPageToken)
            ),
          },
        },
      ]);
    } else {
      playlists = [...playlists, { playlist, videos: data }];
    }
  }
};

const otherPageVideos = async (playlist, pageToken = "") => {
  if (playlist.id) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YOUTUBE_API_KEY}`;

    const options = {
      method: "GET",
      url: url,
      params: {
        part: "snippet",
        maxResults: "50",
        playlistId: playlist.id,
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let { data } = await axios(options).catch((err) => {
      return (error = err.response?.data);
    });

    if(data.items){
      return data.items;
    }
    
  }
};

const requestYoutube = async (req, res) => {
  //get content from method get
  playlistIdArray = req.body.params.playlistIdArray;

  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  for (let i = 0; i < playlistIdArray.length; i++) {
    await getPlayListSong(playlistIdArray[i]);
  }

  if (error) return res.status(400).json(error);

  res.status(200).json(playlists);
};

export default requestYoutube;
