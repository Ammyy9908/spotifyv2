import axios from "axios";

const playNext = async () => {
  try {
    const r = await axios.post(
      `https://api.spotify.com/v1/me/player/next?device_id=${localStorage.getItem(
        "DEVICE_ID"
      )}`,
      {},
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

export default playNext;
