import "../styles/globals.css";
import configureStore from "../redux/store/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
const store = configureStore();
import DectectAccessToken from "../utils/check-access-token";
import getAccessToken from "../utils/get-access-token";
function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log("Application Rendered");

    const get__access__token = async () => {
      const { access_token } = await getAccessToken();
      console.log("Access Token", access_token);
      localStorage.setItem("access_token", access_token);
      setMounted(true);
    };
    if (localStorage.getItem("access_token")) {
      DectectAccessToken()
        .then((me) => {
          console.log("User profile", me);
          const { error } = me;
          if (error) {
            get__access__token();
          } else {
            setMounted(true);
          }
        })
        .catch((e) => {
          console.log("Error while fetching user profile");
        });
    } else {
      setMounted(true);
    }
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setOpenData: (data) => dispatch({ type: "SET_OPEN_DATA", data }),
});

export default MyApp;
