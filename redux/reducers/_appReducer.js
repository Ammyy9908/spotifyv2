const intialState = {
  current_song: 1,
  loggedIn: false,
  user: null,
  playlists: null,
  recents: null,
  devices: null,
  player_state: null,
  favourite_artists: null,
  my_shows: null,
  open_data: null,
  fullscreen: false,
};

export default function AppReducer(state = intialState, action) {
  switch (action.type) {
    case "SET_CURRENT_SONG": {
      return {
        ...state,
        current_song: action.current_song,
      };
    }

    case "SET_USER_SHOWS": {
      return {
        ...state,
        my_shows: action.my_shows,
      };
    }

    case "SET_OPEN_DATA": {
      return {
        ...state,
        open_data: action.data,
      };
    }
    case "SET_FAVOURITE_ARTISTS": {
      return {
        ...state,
        favourite_artists: action.favourite_artists,
      };
    }

    case "SET_PLAYER_STATE": {
      return {
        ...state,
        player_state: action.player_state,
      };
    }

    case "SET_FULL_SCREEN": {
      return {
        ...state,
        fullscreen: action.full_screen,
      };
    }

    case "SET_DEVICES": {
      return {
        ...state,
        devices: action.devices,
      };
    }

    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }

    case "SET_RECENTS": {
      return {
        ...state,
        recents: action.recents,
      };
    }

    case "SET_PLAYLISTS": {
      return {
        ...state,
        playlists: action.playlists,
      };
    }

    case "SET_LOGGED_IN": {
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    }

    default:
      return state;
  }
}
