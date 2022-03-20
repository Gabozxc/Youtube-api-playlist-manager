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
} from "../types/typesYT";

const initialState = {
  playlistItems: [],
  playLists: [],
  searchResults: [],
  loading: false,
  logIn: false,
  message: "",
};

const stateYoutubeApi = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOADING_DATA:
      return {
        ...state,
        loading: true,
        logIn: true,
      };
    case DOWNLOADING_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        playLists: action.payload,
      };
    case CREATING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playLists: [action.payload, ...state.playLists],
      };
    case DELETING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playLists: state.playLists.filter(
          (playlist) => playlist.id !== action.payload
        ),
      };
    case SEARCH_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };
    case SEARCHING_VIDEO:
    case ADD_VIDEOS_SUCCESS:
    case ADDING_VIDEOS:
    case DELETING_PLAYLIST:
    case CREATING_PLAYLIST:
      return {
        ...state,
        loading: true,
      };
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
      };
    default:
      return state;
  }
};

export default stateYoutubeApi;
