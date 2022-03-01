import axios from "axios";

let accessToken;
let playlistId;

const getPlayListSong = async () => {

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: "snippet",
        maxResults: "50",
        playlistId,
        key: process.env.YOUTUBE_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (data?.nextPageToken) {
    return data.items.concat(await getPlayListSong(data.nextPageToken));
  }

  return data.items;

};

const requestYoutube = async (req, res) => {

  playlistId = req.body.id;
  accessToken = req.body.token.accessToken

  try {
    const data = await getPlayListSong();
    res.status(200).json(data);
  }catch(err){
    res.status(200).json(err);
  }
  
};

export default requestYoutube;
