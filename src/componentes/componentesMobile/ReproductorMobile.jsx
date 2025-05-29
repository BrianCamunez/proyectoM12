import React from "react";
import { Box, IconButton } from "@mui/material";
import SpeakerIcon from "@mui/icons-material/Speaker";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

const ReproductorMobile = () => {

  const { cancionActual, reproduciendo, pausar, reanudar, audioRef } = usePlayer();

  if (!cancionActual || !cancionActual.url) return null;

  return (
    <Box display="flex" width="100%" position="absolute" bottom={58} alignItems="center">
      <Box
        display="flex"
        padding={1}
        sx={{
          backgroundColor: "#ff4081",
          marginX: 1,
          width: "100%",
          borderRadius: 2,
          alignItems: "center",
        }}
      >
        <Link to="/cancion" style={{ textDecoration: "none", color: "white", width: "100%" }}>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src={cancionActual.imagen}
              width="40px"
              height="40px"
              borderRadius={2}
            />
            <Box ml={1}>
              <Box>{cancionActual.nombre}</Box>
              <Box>{cancionActual.artista}</Box>
            </Box>
          </Box>
        </Link>
        <Box display="flex" alignItems="center" paddingRight={1}>
          <SpeakerIcon sx={{ fontSize: 30, marginRight: 2 }} />
          <IconButton onClick={reproduciendo ? pausar : reanudar}>
            {reproduciendo ? (
              <PauseIcon sx={{ fontSize: 30, color: "white" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 30, color: "white" }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ReproductorMobile;
