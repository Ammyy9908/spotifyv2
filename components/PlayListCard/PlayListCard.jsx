import React from "react";
import styles from "./PlayListCard.module.css";
import { usePalette } from "react-palette";
import { connect } from "react-redux";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import play from "../../utils/play";
function PlayListCard({ view, current_song, setCurrentSong }) {
  const [image, setImage] = React.useState(view.images[0].url);
  const [color, setColor] = React.useState("#262626");
  const { data, loading, error } = usePalette(image);
  console.log(view);

  React.useEffect(() => {
    if (!loading) {
      console.log(data);
      const { darkVibrant } = data;

      setColor(darkVibrant);
      return;
    }
  }, [loading, data]);

  const handlePlayView = (uri) => {
    play(uri).then(async (feedback) => {
      console.log(feedback);
      setCurrentSong(uri);
    });
  };
  return (
    <div
      className={`${styles.playlist_card} bg-gray-500 py-6 px-3  relative  outline-0`}
    >
      <div
        className={`${styles.card_ripple}`}
        style={{
          backgroundColor: color,
        }}
      ></div>
      <div className="play_list_card_cover artist_card_cover relative w-32 h-32  mx-auto rounded-full shadow-xl">
        <img
          src={view.images[0].url}
          alt="View_cover_photo"
          className="w-full h-full object-cover  shadow-xl"
        />

        <button
          onClick={() => {
            handlePlayView(view.uri);
          }}
          className={`${styles.view_play_btn} absolute w-12 h-12 rounded-full text-2xl flex items-center justify-center shadow-3xl`}
          style={{
            backgroundColor: color,
            color: "white",
          }}
        >
          {current_song === view.uri ? <IoMdPause /> : <IoMdPlay />}
        </button>
      </div>
      <div className={`${styles.play_list_card_footer} mt-6`}>
        <h3 className={`text-md text-white font-bold`}>
          {view.name.length > 18 ? view.name.slice(0, 15) + "..." : view.name}
        </h3>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  current_song: state.appReducer.current_song,
});

const mapDispatchToProps = (dispatch) => ({
  setDevices: (devices) => dispatch({ type: "SET_DEVICES", devices }),
  setPlayerState: (player_state) =>
    dispatch({ type: "SET_PLAYER_STATE", player_state }),
  setCurrentSong: (current_song) =>
    dispatch({ type: "SET_CURRENT_SONG", current_song }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayListCard);
