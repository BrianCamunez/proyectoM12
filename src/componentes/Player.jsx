// src/componentes/Player.jsx
import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Slider, Avatar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import DevicesIcon from "@mui/icons-material/Devices";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { usePlayer } from "../context/PlayerContext";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Player = () => {
  const {
    cancionActual,
    reproduciendo,
    pausar,
    reanudar,
    siguiente,
    anterior,
    audioRef,
    modoRepetir,
    toggleModoRepetir,
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState( (audioRef.current?.volume ?? 0.3) * 100 );

  // Cuando cambia la canción actual, actualizar duración y resetear progreso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setProgress(audio.currentTime);
    };

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioRef, cancionActual]);

  // Actualizar volumen cuando cambie el slider
  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  // Mover progreso manualmente
  const handleProgressChange = (_, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setProgress(newValue);
    }
  };

  if (!cancionActual) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: 90,
        bgcolor: "#000000",
        color: "white",
        display: "flex",
        alignItems: "center",
        px: 2,
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      {/* == Sección izquierda: info de la canción == */}
      <Box sx={{ display: "flex", alignItems: "center", width: 180, minWidth: 160 }}>
        <Avatar
          src={cancionActual.imagen}
          alt="Portada"
          sx={{ width: 48, height: 48, mr: 1 }}
        />
        <Box>
          <Typography variant="subtitle2" noWrap>
            {cancionActual.nombre}
          </Typography>
          <Typography variant="caption" color="#b3b3b3" noWrap>
            {cancionActual.artista}
          </Typography>
        </Box>
      </Box>

      {/* == Sección central: controles y barra de progreso == */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <IconButton size="small">
            <ShuffleIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
          <IconButton size="small" onClick={anterior}>
            <SkipPreviousIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={() => (reproduciendo ? pausar() : reanudar())}
            sx={{
              mx: 1,
              bgcolor: "#ffffff",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
          >
            {reproduciendo ? (
              <PauseIcon sx={{ color: "#000000", fontSize: 18 }} />
            ) : (
              <PlayArrowIcon sx={{ color: "#000000", fontSize: 18 }} />
            )}
          </IconButton>
          <IconButton size="small" onClick={siguiente}>
            <SkipNextIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
          <IconButton size="small" onClick={toggleModoRepetir}>
            <RepeatIcon
              sx={{
                color: modoRepetir === "off" ? "#b3b3b3" : "#ff4081",
                fontSize: 20,
              }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
          <Typography variant="caption" color="#b3b3b3" sx={{ mr: 0.5, fontSize: 12 }}>
            {formatTime(progress)}
          </Typography>
          <Slider
            value={progress}
            max={duration}
            onChange={handleProgressChange}
            aria-labelledby="progreso"
            sx={{
              color: "#ff4081",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 10,
                height: 10,
                bgcolor: "#ffffff",
              },
            }}
          />
          <Typography variant="caption" color="#b3b3b3" sx={{ ml: 0.5, fontSize: 12 }}>
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>

      {/* == Sección derecha: cola, dispositivos y volumen == */}
      <Box sx={{ display: "flex", alignItems: "center", minWidth: 160, justifyContent: "flex-end" }}>
        <IconButton size="small">
          <QueueMusicIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
        </IconButton>
        <IconButton size="small">
          <DevicesIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", width: 100, ml: 1 }}>
          <VolumeUpIcon sx={{ color: "#b3b3b3", mr: 0.5, fontSize: 18 }} />
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            sx={{
              color: "#ff4081",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 10,
                height: 10,
                bgcolor: "#ffffff",
              },
            }}
          />
        </Box>
      </Box>

      {/* El elemento <audio> ya está en PlayerContext (audioRef) */}
    </Box>
  );
};

export default Player;
