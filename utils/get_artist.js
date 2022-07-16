import axios from "axios";

async function getArtistOpen(artist_id) {
  try {
    const r = await axios.get(`http://localhost:5000/artist/${artist_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("open_access_token")}`,
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

export default getArtistOpen;
