import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookies";
import { connect } from "react-redux";

function Authorization({ setLoggedIn }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { access_token, refresh_token } = query;

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted, query, access_token, refresh_token]);

  if (!mounted) {
    return null;
  }

  if (access_token && refresh_token) {
    localStorage.setItem("access_token", query.access_token);
    localStorage.setItem("refresh_token", query.refresh_token);
    setLoggedIn(true);
    window.location.href = "/";
  }

  console.log(query);

  return <div></div>;
}

const mapDispatchToProps = (dispatch) => ({
  setLoggedIn: (loggedIn) => dispatch({ type: "SET_LOGGED_IN", loggedIn }),
});
export default connect(null, mapDispatchToProps)(Authorization);
