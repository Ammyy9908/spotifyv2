import axios from "axios";

async function transferPlayback(device_id) {
  try {
    await axios.put(
      `https://api.spotify.com/v1/me/player`,
      {
        device_ids: [device_id],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return true;
  } catch (e) {
    if (e.response && e.response.data) {
      return false;
    }
  }
}

export default transferPlayback;
