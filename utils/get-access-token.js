const { default: axios } = require("axios");

async function getAccessToken() {
  try {
    const r = await axios.post("http://localhost:5000/refresh_token", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
}

export default getAccessToken;
