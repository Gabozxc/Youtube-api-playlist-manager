import axios from "axios";
import {
  DOWNLOADING_DATA,
  DOWNLOADING_DATA_SUCCESS,
  DOWNLOADING_DATA_FAILURE,
  CREATING_PLAYLIST,
  CREATING_PLAYLIST_SUCCESS,
  CREATING_PLAYLIST_FAILURE,
  EDITING_PLAYLIST,
  EDITING_PLAYLIST_SUCCESS,
  EDITING_PLAYLIST_FAILURE,
  DELETING_PLAYLIST,
  DELETING_PLAYLIST_SUCCESS,
  DELETING_PLAYLIST_FAILURE
} from "../types/typesYT";

export const DownloadUserData = () => {
  return async (dispatch) => {
    dispatch(downloadingData());
    try {
      const { data } = await axios.get("/api/YoutubeApi/getYTData", {
        withCredentials: true,
      });
      console.log(data);
      dispatch(downloadingDataSucess(data));
    } catch (err) {
      console.log(err);
      dispatch(downloadingFailure(err));
    }
  };
};

const downloadingData = () => ({
  type: DOWNLOADING_DATA,
});

const downloadingDataSucess = (data) => ({
  type: DOWNLOADING_DATA_SUCCESS,
  payload: data,
});

const downloadingFailure = (data) => ({
  type: DOWNLOADING_DATA_FAILURE,
  payload: data,
});

export const NewPlayList = (playlist) => {
  return async (dispatch) => {
    dispatch(creatingPlaylist());
    try {
      const { data } = await axios.get("/api/YoutubeApi/createPlayListYT", {
        withCredentials: true,
        params: {
          title: playlist.title,
          description: playlist.description,
          privacyStatus: playlist.privacyStatus,
        },
      });
      dispatch(creatingPlayListSucess(data));
    } catch (err) {
      console.log(err);
      dispatch(creatingPlaylistFailure(err));
    }
  };
};

const creatingPlaylist = () => ({
  type: CREATING_PLAYLIST,
});

const creatingPlayListSucess = (data) => ({
  type: CREATING_PLAYLIST_SUCCESS,
  payload: data,
});

const creatingPlaylistFailure = (err) => ({
  type: CREATING_PLAYLIST_FAILURE,
  payload: err,
});

export const EditPlaylist = (playlist) => {
  return async (dispatch) => {
    dispatch(EditingPlaylist());
    try {
      await axios.post("/api/YoutubeApi/updatePlaylistYT", {
        withCredentials: true,
        idPlaylist: playlist.id,
        title: playlist.title,
        description: playlist.description,
      });
      dispatch(EditingPlaylistSucess());
    } catch (err) {
      console.log(err);
      dispatch(EditingPlaylistError(err));
    }
  };
};

const EditingPlaylist = () => ({
  type: EDITING_PLAYLIST,
});

const EditingPlaylistSucess = (data) => ({
  type: EDITING_PLAYLIST_SUCCESS,
});

const EditingPlaylistError = (err) => ({
  type: EDITING_PLAYLIST_FAILURE,
  payload: err,
});

export const DeletePlaylist = (id) => {
  return async (dispatch) => {
    dispatch(deletingPlaylist());
    try {
      await axios.post("/api/YoutubeApi/deletePlaylistYT", {
        withCredentials: true,
        idPlaylist:id,
      });
      dispatch(deletePlaylistSuccess(id));
    } catch (err) {
      console.log(err);
      dispatch(deletePlaylistError(err));
    }
  };
};

const deletingPlaylist = () => ({
  type: DELETING_PLAYLIST,
});

const deletePlaylistSuccess = (id) => ({
  type: DELETING_PLAYLIST_SUCCESS,
  payload: id,
});

const deletePlaylistError = (err) => ({
  type: DELETING_PLAYLIST_FAILURE,
  payload: err,
});