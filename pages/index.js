import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const [playListVideos, setData] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_YOUTUBE}?part=snippet&playlistId=PLmihl7L0o63gI4u3aGpA8NgY6BowGrkmN&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`
    );
    setData(res.data);
  };

  console.log(playListVideos)

  if (session) {
    return (
      <div>
        Welcome user
        <br />
        <h1>Look the playlist</h1>
        <ul>
          {playListVideos.items?.map((item, index) => (
            <li key={index}>Channel Tittle: {item.snippet.channelTitle}, video: {item.snippet.title}</li>
          ))}
        </ul>
        <button onClick={() => signOut("google")} className="bg-red-500 p-1 text-white rounded mb-10">Sign out</button>
      </div>
    );
  }
  return (
    <div className="bg-blue-400">
      Click to sign into your user account <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
}
