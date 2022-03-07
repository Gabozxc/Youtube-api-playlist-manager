import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { DownloadUserData } from "../actions/ActionsYT";

export default function useCheckSession() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { logIn } = useSelector((state) => state.youtubeApi);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await axios.post("/api/YoutubeApi/checkSession", {
        withCredentials: true,
      });
      if (!data.token) {
        signOut();
      }
    };
    checkSession();
    if (session && logIn === false) {
      dispatch(DownloadUserData());
    }
  }, [dispatch, session, logIn]);
  return session;
}
