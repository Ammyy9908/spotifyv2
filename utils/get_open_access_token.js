import axios from "axios";

const getOpenAccessToken = async () => {
  const r = await axios.get(
    "https://spotifyserversumit.herokuapp.com/getToken"
  );
  return r.data;
};

export default getOpenAccessToken;
