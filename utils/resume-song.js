import axios from "axios";

const resumeSong = async (tracks = null) => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        uris: tracks && tracks,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return r.data;
  } catch (e) {
    return e.message;
  }
};

export default resumeSong;
