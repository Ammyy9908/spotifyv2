import React from "react";
import styles from "./ArtistCard.module.css";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { usePalette } from "react-palette";
import Tilt from "react-tilt";
function ArtistCard({ artist, current_song, handlePlayArtist }) {
  const [image, setImage] = React.useState(artist.images[0].url);
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

  return (
    <div
      className={`${styles.artist_card} bg-gray-400 py-6 px-3 rounded-xl relative outline-0`}
    >
      <div
        className={`${styles.card_ripple}`}
        style={{
          backgroundColor: color,
          transformStyle: `preserve-3d`,
        }}
        data-tilt={true}
      ></div>
      <Tilt
        className="Tilt artist_card_cover relative w-32 h-32  mx-auto rounded-full shadow-xl"
        style={{
          transform: `translateZ(50px)`,
        }}
        options={{ max: 25 }}
      >
        <img
          src={artist.images[0].url}
          alt="artist_cover"
          className="w-full h-full object-cover rounded-full shadow-xl"
        />
        <button
          onClick={() => {
            handlePlayArtist(artist.uri);
          }}
          className={`${styles.artist_play_btn} absolute w-12 h-12   rounded-full text-2xl flex items-center justify-center shadow-3xl`}
          style={{
            backgroundColor: color,
          }}
        >
          {current_song === artist.uri ? <IoMdPause /> : <IoMdPlay />}
        </button>
      </Tilt>
      <div className={`${styles.artist_card_footer} mt-6 text-white`}>
        <h3 className="uppercase font-bold">
          {artist.name.length > 18
            ? artist.name.slice(0, 18) + "..."
            : artist.name}
        </h3>
        <p
          className="px-3 py-1 bg-black/50 mt-2 shadow-xl rounded-full font-bold text-sm"
          style={{
            width: "70px",
            color: color,
          }}
        >
          Artist
        </p>
      </div>
    </div>
  );
}

export default ArtistCard;
