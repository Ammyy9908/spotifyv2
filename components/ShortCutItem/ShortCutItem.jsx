import React from "react";
import { connect } from "react-redux";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import styles from "./ShortCutItem.module.css";
import playTrack from "../../utils/playTrack";
import getPlayerState from "../../utils/get-player-state";
function ShortCutItem({
  image,
  text,
  id,
  current_song,
  setCurrentSong,
  setImage,
  uri,
  setPlayerState,
}) {
  const handlePlay = () => {
    playTrack(uri)
      .then(async (feedback) => {
        console.log(feedback);
        setCurrentSong(uri);
        const state = await getPlayerState();
        setPlayerState(state);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div
      className={`${styles.shortcut_item} bg-gray-700 rounded-md flex cursor-pointer`}
      onMouseOver={() => {
        setImage(image);
      }}
    >
      <div className={`${styles.shortcut_item_thumb}`}>
        <img src={image} alt="" />
      </div>
      <div className="shortcut_item_content py-3 px-3 flex items-center text-white font-semibold">
        <h3>{text}</h3>
        <button
          className={`${styles.shortcut_play_icon} w-12 h-12 rounded-full  shadow-lg bg-green-400 absolute text-black flex items-center justify-center text-2xl`}
          onClick={handlePlay}
        >
          {current_song == uri ? <IoMdPause /> : <IoMdPlay />}
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentSong: (current_song) =>
    dispatch({ type: "SET_CURRENT_SONG", current_song }),
  setPlayerState: (player_state) =>
    dispatch({ type: "SET_PLAYER_STATE", player_state }),
});

const mapStateToProps = (state) => ({
  current_song: state.appReducer.current_song,
});
export default connect(mapStateToProps, mapDispatchToProps)(ShortCutItem);
