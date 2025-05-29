import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [cancionActual, setCancionActual] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  const audioRef = useRef(null);


  const reproducirCancion = (cancion) => {
    console.log("Intentando reproducir:", cancion);
    setCancionActual(cancion);
    setReproduciendo(true);
  };

  const pausar = () => {
    setReproduciendo(false);
  };

  const reanudar = () => {
    setReproduciendo(true);
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
        reproducirCancion,
        reproduciendo,
        pausar,
        reanudar,
        audioRef,
      }}
    >
      <>
        {children}
        {cancionActual?.url && (
          <audio
            ref={audioRef}
            src={cancionActual.url}
            autoPlay
            onEnded={() => setReproduciendo(false)}
          />
        )}
      </>
    </PlayerContext.Provider>
  );
};
