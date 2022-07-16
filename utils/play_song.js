import axios from "axios";

const playSong = async (tracks, device_id) => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
      {
        uris: tracks,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return r;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default playSong;
