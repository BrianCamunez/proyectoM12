// src/componentes/Player.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Avatar,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import DevicesIcon from "@mui/icons-material/Devices";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

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
        zIndex: 10
      }}
    >
      {/* == Sección izquierda: info de la canción == */}
      <Box sx={{ display: "flex", alignItems: "center", width: 180, minWidth: 160 }}>
        <Avatar
          src="https://via.placeholder.com/48"
          alt="Portada"
          sx={{ width: 48, height: 48, mr: 1 }}
        />
        <Box>
          <Typography variant="subtitle2" noWrap>
            Mi Vecinita
          </Typography>
          <Typography variant="caption" color="#b3b3b3" noWrap>
            Plan B
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
          pt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <IconButton size="small">
            <ShuffleIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
          <IconButton size="small">
            <SkipPreviousIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={togglePlay}
            sx={{
              mx: 1,
              bgcolor: "#ffffff",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ color: "#000000", fontSize: 18 }} />
            ) : (
              <PlayArrowIcon sx={{ color: "#000000", fontSize: 18 }} />
            )}
          </IconButton>
          <IconButton size="small">
            <SkipNextIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
          <IconButton size="small">
            <RepeatIcon sx={{ color: "#b3b3b3", fontSize: 20 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
          <Typography variant="caption" color="#b3b3b3" sx={{ mr: 0.5, fontSize: 12 }}>
            1:35
          </Typography>
          <Slider
            value={35}
            aria-labelledby="continuous-slider"
            sx={{
              color: "#1db954",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 10,
                height: 10,
                bgcolor: "#ffffff",
              },
            }}
          />
          <Typography variant="caption" color="#b3b3b3" sx={{ ml: 0.5, fontSize: 12 }}>
            3:02
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
              color: "#b3b3b3",
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
    </Box>
  );
};

export default Player;
