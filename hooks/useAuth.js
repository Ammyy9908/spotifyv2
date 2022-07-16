import axios from "axios";
import React from "react";

function useAuth() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    async function getUser() {
      try {
        const r = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        return r.data;
      } catch (e) {
        console.log(e);
      }
    }

    getUser()
      .then((user) => {
        setUser(user);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return user;
}

export default useAuth;
