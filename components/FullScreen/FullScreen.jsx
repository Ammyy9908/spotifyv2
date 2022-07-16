import React from "react";
import { connect } from "react-redux";
import getArtist from "../../utils/get-artist";
import getArtistOpen from "../../utils/get_artist";
import styles from "./FullScreen.module.css";
import { IoMdPause, IoMdPlay } from "react-icons/io";
function FullScreen({ fullscreen }) {
  const [artist, setArtist] = React.useState(null);
  React.useEffect(() => {
    getArtistOpen(fullscreen.item.artists[0].id)
      .then((art) => {
        console.log(art);
        setArtist(art);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(artist);
  return (
    <div
      className={`${styles.fullScreen}`}
      style={{
        backgroundImage: `url(${
          artist && artist.data.artist.visuals.headerImage.sources[0].url
        })`,
        backgroundSize: "cover",
      }}
    >
      <div className={styles.full_screen_overlay}></div>
      <div
        className={`${styles.full_screen_wrapper} py-6 px-3 flex flex-col justify-between h-full`}
      >
        <div className="full_screen_header flex items-center justify-between">
          <div className="play_from_container flex items-center gap-8">
            <span>
              <img src="/spotify.svg" alt="brand-logo" width="110" />
            </span>
            <div className="full_screen_track_info">
              <span>
                <h3 className="uppercase text-xs">Playing from Artist</h3>
              </span>
              <p>AP Dhillon</p>
            </div>
          </div>

          <div className="upcoming_track border-2 border-gray-300 bg-black flex w-64 gap-2 py-2">
            <div className="upcoming_track_cover w-12 h-12 bg-gray-200 ml-2"></div>
            <div className="upcoming_track_info">
              <p className="uppercase text-xs text-gray-300 font-semibold">
                Up next
              </p>
              <p>Track Name</p>
            </div>
          </div>
        </div>
        <div className="full_screen_player flex w-full flex-col gap-3 items-start">
          <div className="full_screen_track_cover w-32 h-32 bg-gray-700"></div>
          <div className="full_screen_player_controls flex items-center justify-between w-full">
            <button>
              <img src="/img/spotify_heart_filled.svg" alt="heart-icon" />
            </button>
            <ul className="flex items-center gap-3 flex justify-center items-center w-full">
              <li>
                <button>
                  <img src="/img/shuffle_active.svg" alt="shuffle_icon" />
                </button>
              </li>
              <li>
                <button>
                  <img src="/img/prev__icon.svg" alt="previous_icon" />
                </button>
              </li>
              <li>
                <button className="w-12 h-12 bg-white rounded-full text-black flex items-center justify-center">
                  <IoMdPause />
                </button>
              </li>
              <li>
                <button>
                  <img src="/img/next__icon.svg" alt="next_icon" />
                </button>
              </li>
              <li>
                <button>
                  <img src="/img/repeat_active.svg" alt="repeat_icon" />
                </button>
              </li>
            </ul>
            <div className="full_screen_player_controls_right flex items-center gap-3">
              <button>
                <img
                  src="/img/speaker.svg"
                  alt="speaker-icon"
                  width="71"
                  height={"41"}
                />
              </button>

              <div className={`${styles.custom_slider} relative`}>
                <div className={styles.slider_bar}>
                  <div
                    className={styles.volume_fill}
                    style={{
                      width: `${50}%`,
                    }}
                  ></div>
                </div>
                <input
                  type="range"
                  className={styles.volume_slider}
                  min="0"
                  max="100"
                  value={50}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fullscreen: state.appReducer.fullscreen,
});
export default connect(mapStateToProps, null)(FullScreen);
