import axios from "axios";

const playTrack = async (uri) => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${localStorage.getItem(
        "DEVICE_ID"
      )}`,
      {
        uris: [uri],
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

export default playTrack;
