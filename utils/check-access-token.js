const { default: axios } = require("axios");

async function DectectAccessToken() {
  try {
    const r = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
}

export default DectectAccessToken;
