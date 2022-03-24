import axios from "axios";

let accessToken;
let playlistId;
let error;

const getPlayListSong = async (pageToken = '') => {

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: "snippet",
        maxResults: "50",
        playlistId,
        pageToken,
        key: process.env.YOUTUBE_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).catch(err => {
    return error = err.response?.data
  })

  if(error) return error;

  if (data?.nextPageToken) {
    return data.items.concat(await getPlayListSong(data.nextPageToken));
  }

  return data.items;

};

const requestYoutube = async (req, res) => {

  playlistId = req.body.id;
  accessToken = req.body.token.accessToken

  const data = await getPlayListSong();

  if (error) return res.status(400).json(data);

  res.status(200).json(data);
  
};

export default requestYoutube;
