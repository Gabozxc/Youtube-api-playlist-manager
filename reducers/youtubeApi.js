import {
  DOWNLOADING_DATA,
  DOWNLOADING_DATA_SUCCESS,
  DOWNLOADING_DATA_FAILURE,
  CREATING_PLAYLIST,
  CREATING_PLAYLIST_SUCCESS,
  CREATING_PLAYLIST_FAILURE,
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
  EDITING_PLAYLIST,
  EDITING_PLAYLIST_SUCCESS,
  EDITING_PLAYLIST_FAILURE,
  CLEAN_MESSAGE,
  DOWNLOADING_VIDEOS,
  DOWNLOADING_VIDEOS_SUCCESS,
  DOWNLOADING_VIDEOS_FAILURE,
  LOADING_PAGE,
  LOADING_PAGE_SUCCESS,
} from "../types/typesYT";

const initialState = {
  playListObject: [],
  searchResults: [],
  loading: false,
  error: false,
  logIn: false,
  message: "",
};

const stateYoutubeApi = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOADING_DATA:
      return {
        ...state,
        loading: true,
        error: false,
        logIn: true,
      };
    case DOWNLOADING_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        playListObject: action.payload,
      };
    case DOWNLOADING_VIDEOS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DOWNLOADING_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        playListObject: action.payload,
      };
    case DOWNLOADING_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case DOWNLOADING_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case CREATING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "Playlist successfully created",
        playListObject: [action.payload, ...state.playListObject],
      };
    case DELETING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: "Playlist successfully deleted",
        playListObject: state.playListObject.filter(
          (playlist) => playlist.playlist.id !== action.payload
        ),
      };
    case SEARCH_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        searchResults: action.payload,
      };
    case DELETE_VIDEO_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        playListObject: state.playListObject.map((object) => {
          if (object.playlist.id === action.payload.idPlaylist) {
            return {
              ...object,
              videos: {
                ...object.videos,
                items: object.videos.items.filter(
                  (video) => video.id !== action.payload.idVideo
                ),
              },
            };
          }
          return object;
        }),
      };
    case ADD_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Videos successfully added",
        error: false,
        // playListObject: state.playListObject.map((object) => {
        //   if (action.payload.playlists.includes(object.playlist.id)) {
        //     let videoAdd = action.payload.videos.filter((video) => video.snippet.playlistId === object.playlist.id);
        //     return {
        //       ...object,
        //       videos: {
        //         ...object.videos,
        //         items: [...object.videos.items,  ...videoAdd]
        //       },
        //     };
        //   }
        //   return object;
        // })
      };
    case EDITING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Playlist successfully edited",
        error: false,
        playListObject: state.playListObject.map((object) => {
          if (object.playlist.id === action.payload.id) {
            return {
              ...object,
              playlist: {
                ...object.playlist,
                title: action.payload.title,
                description: action.payload.description,
                id: action.payload.id,
              },
            };
          }
          return object;
        }),
      };
    case LOADING_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case LOADING_PAGE:
    case EDITING_PLAYLIST:
    case SEARCHING_VIDEO:
    case ADDING_VIDEOS:
    case DELETING_VIDEO_FROM_PLAYLIST:
    case DELETING_PLAYLIST:
    case CREATING_PLAYLIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDITING_PLAYLIST_FAILURE:
    case DELETE_VIDEO_FROM_PLAYLIST_FAILURE:
    case ADD_VIDEOS_FAILURE:
    case DELETING_PLAYLIST_FAILURE:
    case DELETING_PLAYLIST_FAILURE:
    case CREATING_PLAYLIST_FAILURE:
    case SEARCH_VIDEO_FAILURE:
    case DOWNLOADING_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: true,
      };
    case CLEAN_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default stateYoutubeApi;
