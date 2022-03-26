import { getToken } from "next-auth/jwt";
import axios from "axios";

const secret = process.env.SECRET;
const maxResults = "50";
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
        maxResults: maxResults,
        playlistId: playlist.id,
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const start = new Date().getTime();

    let { data } = await axios(options).catch((err) => {
      return (error = err.response?.data);
    });

    const end = new Date().getTime();
    const time = end - start;
    const timeRequest = {
      time: time,
    };

    if (data?.nextPageToken && maxResults >= "50") {
      const otherVideos = await otherPageVideos(playlist, data.nextPageToken);
      return (playlists = [
        ...playlists,
        {
          playlist,
          timeRequest: {
            time: time + otherVideos.time,
          },
          videos: {
            ...data,
            items: [...data.items, ...otherVideos.data],
          },
        },
      ]);
    } else {
      playlists = [...playlists, { playlist, videos: data, timeRequest }];
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

    const start = new Date().getTime();

    let { data } = await axios(options).catch((err) => {
      return (error = err.response?.data);
    });

    const end = new Date().getTime();
    const time = end - start;

    if (data.items) {
      const request = {
        data: data.items,
        time: time,
      };
      return request;
    }
  }
};

const requestYoutube = async (req, res) => {
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
