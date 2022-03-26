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
  DELETING_PLAYLIST_FAILURE,
  ADDING_VIDEOS,
  ADD_VIDEOS_SUCCESS,
  ADD_VIDEOS_FAILURE,
  SEARCHING_VIDEO,
  SEARCH_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAILURE,
  DELETING_VIDEO_FROM_PLAYLIST,
  DELETE_VIDEO_FROM_PLAYLIST_SUCCESS,
  DELETE_VIDEO_FROM_PLAYLIST_FAILURE,
  CLEAN_MESSAGE,
  DOWNLOADING_VIDEOS,
} from "../types/typesYT";

export const DownloadUserData = () => {
  return async (dispatch) => {
    dispatch(downloadingData());

    try {
      const { data } = await axios.get("/api/YoutubeApi/getYTData", {
        withCredentials: true,
      });
      const playlistWithVideosEmpty = data.map((playlist) => {
        return {
          playlist: playlist,
          videos: [],
        };
      });
      dispatch(downloadingDataSucess(playlistWithVideosEmpty));
    } catch (err) {
      console.log(err);
      dispatch(downloadingFailure(err.response.data.error.message));
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

export const DonwloadVideoEachPlaylist = (data) => {
  return async (dispatch) => {
    dispatch(downloadingVideos());
    try {
      const playlistsArray = data.map((playlist) => {
        return {
          ...playlist,
        };
      });

      console.log(playlistsArray);

      const playlistsWithVideos = await axios.post(
        "/api/YoutubeApi/getVideosFromPlaylists",
        {
          withCredentials: true,
          params: {
            playlistIdArray: playlistsArray,
          },
        }
      );

      dispatch(downloadingVideosSucess(playlistsWithVideos.data));
    } catch (err) {
      console.log(err.response);
      dispatch(downloadingVideosFailure(err.response.data.error.message));
    }
  };
};

const downloadingVideos = () => ({
  type: DOWNLOADING_VIDEOS,
});

const downloadingVideosSucess = (data) => ({
  type: DOWNLOADING_VIDEOS_SUCCESS,
  payload: data,
});

const downloadingVideosFailure = (data) => ({
  type: DOWNLOADING_VIDEOS_FAILURE,
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
      const playlistWithVideoEmpty = {
        playlist: data,
        videos: {
          items: [],
        },
      };
      dispatch(creatingPlayListSucess(playlistWithVideoEmpty));
    } catch (err) {
      console.log(err);
      dispatch(creatingPlaylistFailure(err.response.data.error.message));
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
      dispatch(EditingPlaylistSucess(playlist));
    } catch (err) {
      console.log(err);
      dispatch(EditingPlaylistError(err.response.data.error.message));
    }
  };
};

const EditingPlaylist = () => ({
  type: EDITING_PLAYLIST,
});

const EditingPlaylistSucess = (playlist) => ({
  type: EDITING_PLAYLIST_SUCCESS,
  payload: playlist,
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
        idPlaylist: id,
      });
      dispatch(deletePlaylistSuccess(id));
    } catch (err) {
      console.log(err);
      dispatch(deletePlaylistError(err.response.data.error.message));
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

export const AddVideos = (videos, playlists) => {
  return async (dispatch) => {
    dispatch(addingVideos());

    try {
      const { data } = await axios.post("/api/YoutubeApi/AddVideos", {
        withCredentials: true,
        videos: videos,
        playlists: playlists,
      });

      const playlistsWithVideos = {
        playlists: playlists,
        videos: data,
      };

      dispatch(addVideosSuccess(playlistsWithVideos));
    } catch (err) {
      console.log(err);
      dispatch(addVideosError(err.response.data.error.message));
    }
  };
};

const addingVideos = () => ({
  type: ADDING_VIDEOS,
});

const addVideosSuccess = (playlistsWithVideos) => ({
  type: ADD_VIDEOS_SUCCESS,
  payload: playlistsWithVideos,
});

const addVideosError = (err) => ({
  type: ADD_VIDEOS_FAILURE,
  payload: err,
});

export const SearchVideo = (search) => {
  return async (dispatch) => {
    dispatch(searchingVideo());
    try {
      const { data } = await axios.post("/api/YoutubeApi/getVideosYT", {
        withCredentials: true,
        qSearch: search,
      });
      dispatch(searchVideoSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(searchVideoError(err.response.data.error.message));
    }
  };
};

const searchingVideo = () => ({
  type: SEARCHING_VIDEO,
});

const searchVideoSuccess = (data) => ({
  type: SEARCH_VIDEO_SUCCESS,
  payload: data,
});

const searchVideoError = (err) => ({
  type: SEARCH_VIDEO_FAILURE,
  payload: err,
});

export const DeleteVideoFromPlaylist = (idVideo, idPlaylist) => {
  return async (dispatch) => {
    dispatch(deletingVideoFromPlaylist());
    try {
      await axios.post("/api/YoutubeApi/deleteVideoFromPlaylist", {
        withCredentials: true,
        idVideo: idVideo,
      });
      dispatch(deleteVideoFromPlaylistSuccess(idVideo, idPlaylist));
    } catch (err) {
      dispatch(deleteVideoFromPlaylistError(err.response.data.error.message));
    }
  };
};

const deletingVideoFromPlaylist = () => ({
  type: DELETING_VIDEO_FROM_PLAYLIST,
});

const deleteVideoFromPlaylistSuccess = (idVideo, idPlaylist) => ({
  type: DELETE_VIDEO_FROM_PLAYLIST_SUCCESS,
  payload: {
    idVideo,
    idPlaylist,
  },
});

const deleteVideoFromPlaylistError = (err) => ({
  type: DELETE_VIDEO_FROM_PLAYLIST_FAILURE,
  payload: err,
});

export const CleanMessage = () => {
  return {
    type: CLEAN_MESSAGE,
  };
};
