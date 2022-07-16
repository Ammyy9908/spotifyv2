import axios from "axios";

const getSpotifyData = async () => {
  try {
    const r = await axios.get(
      `https://api.spotify.com/v1/views/desktop-home?timestamp=2021-07-26T08%3A34%3A52.054Z&platform=web&content_limit=25&limit=20&types=album%2Cplaylist%2Cartist%2Cshow%2Cstation%2Cepisode&image_style=gradient_overlay&country=IN&locale=en&market=IN`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("open_access_token")}`,
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

export default getSpotifyData;
