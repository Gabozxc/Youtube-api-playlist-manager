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
  SEARCH_VIDEO_SUCCESS
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
    case DOWNLOADING_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATING_PLAYLIST:
      return {
        ...state,
        loading: true,
      };
    case CREATING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playLists: [action.payload, ...state.playLists],
      };
    case CREATING_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case DELETING_PLAYLIST:
      return {
        ...state,
        loading: true,
      };
    case DELETING_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playLists: state.playLists.filter(
          (playlist) => playlist.id !== action.payload
        ),
      };
    case DELETING_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ADDING_VIDEOS: 
      return {
        ...state,
        loading: true,
      };
    case ADD_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SEARCHING_VIDEO:
      return {
        ...state,
        loading: true
      }
    case SEARCH_VIDEO_SUCCESS: 
      return {
        ...state,
        loading: false,
        searchResults: action.payload
      }
    default:
      return state;
  }
};

export default stateYoutubeApi;
