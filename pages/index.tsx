import Head from "next/head";
import { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "../styles/Home.module.css";
import {connect} from "react-redux";
import NonAuth from "../components/NonAuth/index";
import { useRouter } from "../node_modules/next/router";
import useAuth from "../hooks/useAuth"
import getPlaylists from "../utils/get_playlists"
import getRecent from "../utils/get-recents"
import getDevices from "../utils/get-devices"
import getPlayerState from "../utils/get-player-state"
import getFavouriteArtists from "../utils/get-favourite-artists"
import getMyShows from "../utils/get-my-shows"
import Player from "../components/Player/Player";
import getSpotifyData from "../utils/get-spotify-open-data"
import getOpenAccessToken from "../utils/get_open_access_token"


 function Home({loggedIn,setLoggedIn,setPlaylists,setRecents,setDevices,setPlayerState,setFavouriteArtists,setMyShows,setOpenData,player_state}) {
  const [mounted,setMounted] = useState(false);

  const user= useAuth();
  console.log("User",user)


  
  
  
  useEffect( () => {
    setMounted(true);

    

    async function Init(){
      // get open access token for recieving open player data from spotify


      const fetchOpenToken = async ()=>{
        const data  = await getOpenAccessToken();
        if(data){
          const {token} = data;
          localStorage.setItem('open_access_token', token);
        }
        return true;
      }
      fetchOpenToken();
      let playlists= await getPlaylists();
      setPlaylists(playlists);
      let recents = await getRecent();
      setRecents(recents);
      let devices = await getDevices();

      setDevices(devices.devices);

      let player_state = await getPlayerState();
      console.log("Player State",player_state)
      setPlayerState(player_state);
      let favourite_artists = await getFavouriteArtists();
      console.log("Favourite Artists",favourite_artists)
      setFavouriteArtists(favourite_artists);
      let my_shows = await getMyShows();
      console.log("My Shows",my_shows)
      setMyShows(my_shows);
      const open_data = await getSpotifyData();
      console.log("Open Data",open_data)
      const {error} = open_data;
      if(error){
        fetchOpenToken();
      }
      
      setOpenData({views:open_data.content.items.filter((view)=>view.type==="view" && view.content.items.length>0)});
      
    }

    // get recent played tracks

    if(loggedIn){
      Init(); 
    }

    //check person have access_token

    if(localStorage.getItem('access_token')){
      setLoggedIn(true);
    }
  }, [mounted]);

  if(!mounted){
    return null;
  }

  


  return (
    <div>
      <Head>
        <title>Spotify</title>
        <meta name="description" content="Spotify|Made with Spotify" />
        <link rel="icon" href="/favicon.ico" />
        
        
        
      </Head>
      {!loggedIn?<NonAuth/>:<div className="screen">
      <Sidebar/>
      <Main/>
      {player_state && <Player/>}
      </div>}

      
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.appReducer.loggedIn,
  player_state:state.appReducer.player_state,
})


const mapDispatchToProps = (dispatch) => ({
  setLoggedIn: (loggedIn) => dispatch({ type: "SET_LOGGED_IN", loggedIn }),
  setPlaylists:(playlists) => dispatch({ type: "SET_PLAYLISTS", playlists }),
  setRecents:(recents)=>dispatch({type:"SET_RECENTS",recents}),
  setDevices:(devices)=>dispatch({type:"SET_DEVICES",devices}),
  setPlayerState:(player_state)=>dispatch({type:"SET_PLAYER_STATE",player_state}),
  setFavouriteArtists:(favourite_artists)=>dispatch({type:"SET_FAVOURITE_ARTISTS",favourite_artists}),
  setMyShows:(my_shows)=>dispatch({type:"SET_USER_SHOWS",my_shows}),
  setOpenData: (data) => dispatch({ type: "SET_OPEN_DATA", data }),
});


export default connect(mapStateToProps,mapDispatchToProps)(Home);
