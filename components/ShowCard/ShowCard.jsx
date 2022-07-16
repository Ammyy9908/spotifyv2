import React from "react";
import styles from "./ShowCard.module.css";
import { usePalette } from "react-palette";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import play from "../../utils/play";
import { connect } from "react-redux";
function ShowCard({ my_show, setCurrentSong, current_song }) {
  const [image, setImage] = React.useState(my_show.show.images[0].url);
  const [color, setColor] = React.useState("#262626");
  const { data, loading, error } = usePalette(image);

  React.useEffect(() => {
    if (!loading) {
      console.log(data);
      const { lightVibrant } = data;

      setColor(lightVibrant);
      return;
    }
  }, [loading, data]);

  const handlePlay = () => {
    play(my_show.show.uri)
      .then((feedback) => {
        console.log(feedback);
        setCurrentSong(my_show.show.uri);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div
      className={`${styles.show_card} bg-gray-500 py-6 px-3 rounded-xl relative hover:scale-95 transform-gpu`}
    >
      <div
        className={styles.card_ripple}
        style={{
          backgroundColor: color,
        }}
      ></div>

      <div className="show_card_cover artist_card_cover relative w-32 h-32  mx-auto rounded-full shadow-xl">
        <button
          className={`${styles.card_play_btn} shadow-3xl rounded-full flex items-center justify-center border-4 border-white`}
          style={{
            backgroundColor: color,
          }}
          onClick={handlePlay}
        >
          {current_song === my_show.show.uri ? <IoMdPause /> : <IoMdPlay />}
        </button>
        <img
          src={my_show.show.images[0].url}
          alt="show_over"
          className="rounded-full"
        />
      </div>
      <div className={`${styles.show_card_footer} mt-3 text-white w-full`}>
        <h3 className="text-md font-bold">{my_show.show.name}</h3>
        <p className="text-sm">{my_show.show.publisher}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowCard);
