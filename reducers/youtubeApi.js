import {
  DOWNLOADING_DATA,
  DOWNLOADING_DATA_SUCCESS,
  DOWNLOADING_DATA_FAILURE,
  CREATING_PLAYLIST,
  CREATING_PLAYLIST_SUCCESS,
  CREATING_PLAYLIST_FAILURE,
  DELETING_PLAYLIST,
  DELETING_PLAYLIST_SUCCESS,
  DELETING_PLAYLIST_FAILURE
} from "../types/typesYT";

const initialState = {
  playlistItems: false,
  playLists: [],
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
        logIn: false,
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
    default:
      return state;
  }
};

export default stateYoutubeApi;
