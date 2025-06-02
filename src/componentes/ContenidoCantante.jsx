// src/componentes/ContenidoCantante.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
  Divider,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
import { supabase } from "../supabase/supabase";

const ContenidoCantante = () => {
  const { id } = useParams(); // ID del artista
  const [artista, setArtista] = useState(null);
  const [canciones, setCanciones] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoadingArtist(true);
      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("nombre, avatar")
          .eq("id", id)
          .single();
        if (error) throw error;
        setArtista(data);
      } catch (err) {
        console.error("Error cargando datos del artista:", err.message);
        setArtista(null);
      } finally {
        setLoadingArtist(false);
      }
    };

    const fetchSongs = async () => {
      setLoadingSongs(true);
      try {
        const { data, error } = await supabase
          .from("canciones")
          .select("id, nombre, imagen")
          .eq("artista", id)
          .limit(10);
        if (error) throw error;
        setCanciones(data || []);
      } catch (err) {
        console.error("Error cargando canciones populares:", err.message);
        setCanciones([]);
      } finally {
        setLoadingSongs(false);
      }
    };

    fetchArtist();
    fetchSongs();
  }, [id]);

  // Formatea segundos a "m:ss"
  const formatDuration = (secs) => {
    if (!secs) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // Formatea número grande con separador de miles
  const formatStreams = (num) => {
    return num?.toLocaleString?.() || "0";
  };

  if (loadingArtist) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#121212",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (!artista) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#121212",
          color: "#b3b3b3",
          p: 2,
        }}
      >
        <Typography>No se encontró el artista.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#121212",
        overflowY: "auto",
        height: "100%",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#2e2e2e",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#555555",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#777777",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#555555 #2e2e2e",
      }}
    >
      {/* === Cabecera del artista === */}
      <Box
        sx={{
          position: "relative",
          height: 300,
          backgroundImage: artista.avatar
            ? `url(${artista.avatar})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(18,18,18,0.6) 0%, rgba(18,18,18,1) 80%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            src={artista.avatar || ""}
            sx={{
              width: 120,
              height: 120,
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {artista.verified && (
                <VerifiedIcon sx={{ color: "#1db954", fontSize: 20 }} />
              )}
              <Typography
                variant="h3"
                fontWeight="bold"
                color="white"
                sx={{ lineHeight: 1.1 }}
              >
                {artista.nombre}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="#b3b3b3"
              sx={{ mt: 0.5 }}
            >
              {formatStreams(artista.oyentes)} oyentes mensuales
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  textTransform: "none",
                  bgcolor: "#1db954",
                  "&:hover": { bgcolor: "#1ed760" },
                }}
              >
                Reproducir
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderColor: "#b3b3b3",
                  color: "white",
                  "&:hover": { borderColor: "#fff" },
                }}
              >
                Seguir
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* === Sección: Canciones populares === */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" color="white" sx={{ mb: 2 }}>
          Populares
        </Typography>

        {loadingSongs ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : canciones.length === 0 ? (
          <Typography color="#b3b3b3">
            No hay canciones disponibles.
          </Typography>
        ) : (
          canciones.map((song, index) => (
            <Box key={song.id} sx={{ mb: 1 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={1}
                sx={{
                  "&:hover": { backgroundColor: "#2c2c2c" },
                }}
              >
                <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                  <Typography
                    variant="body2"
                    color="#b3b3b3"
                    sx={{ width: 24, textAlign: "right" }}
                  >
                    {index + 1}
                  </Typography>

                  <Box
                    sx={{
                      position: "relative",
                      width: 40,
                      height: 40,
                      "&:hover .play-icon": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={song.imagen}
                      alt={song.nombre}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <IconButton
                      className="play-icon"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        width: 28,
                        height: 28,
                        opacity: 0,
                        transition: "opacity 0.2s",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                      }}
                    >
                      <PlayArrowIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      color="white"
                      noWrap
                      sx={{ fontWeight: 500 }}
                    >
                      {song.nombre}
                    </Typography>
                    <Typography variant="caption" color="#b3b3b3">
                      {artista.nombre}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                  <Box textAlign="right">
                    <Typography variant="body2" color="#b3b3b3">
                      {formatStreams(song.reproducciones)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="#b3b3b3" sx={{ width: 40 }}>
                    {formatDuration(song.duracion)}
                  </Typography>
                  <IconButton>
                    <MoreHorizIcon sx={{ color: "#b3b3b3" }} />
                  </IconButton>
                </Box>
              </Box>
              {index < canciones.length - 1 && (
                <Divider sx={{ borderColor: "rgba(174,174,174,0.2)" }} />
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ContenidoCantante;
