import axios from "axios";

const getRecent = async () => {
  try {
    const r = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default getRecent;
