import axios from "axios";

async function getDevices() {
  try {
    const r = await axios.get("	https://api.spotify.com/v1/me/player/devices", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
}

export default getDevices;
