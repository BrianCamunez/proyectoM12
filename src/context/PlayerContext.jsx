import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [cancionActual, setCancionActual] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [modoRepetir, setModoRepetir] = useState("off"); // "off" | "playlist" | "cancion"
  const [playlistActual, setPlaylistActual] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);

  const audioRef = useRef(null);

  const reproducirCancion = (cancion, playlist = []) => {
    const index = playlist.findIndex((c) => c.id === cancion.id);
    setIndiceActual(index >= 0 ? index : 0);


    setCancionActual(cancion);
    setPlaylistActual(playlist);
    setReproduciendo(true);
  };

  const pausar = () => {
    setReproduciendo(false);
  };

  const reanudar = () => {
    setReproduciendo(true);
  };

  const siguiente = () => {



    if(modoRepetir == "cancion"){
      setModoRepetir("playlist")
    }

    const siguienteIndex = indiceActual + 1;

    if (siguienteIndex < playlistActual.length) {
      reproducirCancion(playlistActual[siguienteIndex], playlistActual);
    } else if (modoRepetir === "playlist" && playlistActual.length > 0) {
      reproducirCancion(playlistActual[0], playlistActual); // 🔁 repetir desde el principio
    } else {
      setReproduciendo(false); // 🚫 no hacer nada más
    }
  };

  const anterior = () => {
    const previoIndex = indiceActual - 1;

    if (previoIndex >= 0) {
      const anteriorCancion = playlistActual[previoIndex];
      reproducirCancion(anteriorCancion, playlistActual);
    }
  };

  const toggleModoRepetir = () => {
    setModoRepetir((prev) =>
      prev === "off" ? "playlist" : prev === "playlist" ? "cancion" : "off"
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      if (reproduciendo) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [reproduciendo, cancionActual]);

  return (
    <PlayerContext.Provider
      value={{
        cancionActual,
        playlistActual,
        indiceActual,
        reproducirCancion,
        siguiente,
        anterior,
        pausar,
        reanudar,
        reproduciendo,
        audioRef,
        modoRepetir,
        setModoRepetir,
        toggleModoRepetir,
      }}
    >
      <>
        {children}
        {cancionActual?.cancion && (
          <audio
            ref={audioRef}
            src={cancionActual.cancion}
            autoPlay
            onEnded={() => {
              if (!audioRef.current) return;
              if (modoRepetir == "cancion") {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              } else {
                siguiente();
              }

            }}
          />
        )}
        {console.log(modoRepetir)}
        {console.log(indiceActual)}
      </>
    </PlayerContext.Provider>
  );
};
