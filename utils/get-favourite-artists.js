import axios from "axios";

async function getFavouriteArtists() {
  try {
    const r = await axios.get(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log(e);
  }
}

export default getFavouriteArtists;
