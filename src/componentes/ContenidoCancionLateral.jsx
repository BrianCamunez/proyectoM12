// src/componentes/InfoCancionSidebar.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { usePlayer } from "../context/PlayerContext";
import { supabase } from "../supabase/supabase";

const ContenidoCancionLateral = () => {
  
  const { cancionActual } = usePlayer();

  // Estados para canciones relacionadas y datos básicos del artista
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [artistInfo, setArtistInfo] = useState(null);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [loadingArtist, setLoadingArtist] = useState(false);

  useEffect(() => {
    if (!cancionActual || !cancionActual.artista) return;

    // 1. Obtener canciones relacionadas (mismo artista, distinta canción)
    const fetchRelatedSongs = async () => {
      setLoadingRelated(true);
      try {
        const { data, error } = await supabase
          .from("canciones")
          .select("id, nombre, imagen, usuarios(nombre)")
          .eq("usuarios.nombre", cancionActual.artista)
          .neq("id", cancionActual.id)
          .limit(5);
        console.log("Canciones relacionadas:", data);
        if (error) throw error;
        setRelatedSongs(data || []);
      } catch (err) {
        console.error("Error cargando canciones relacionadas:", err.message);
        setRelatedSongs([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    // 2. Obtener información básica del artista (avatar y nombre)
    const fetchArtistInfo = async () => {
      setLoadingArtist(true);
      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("avatar, nombre")
          .eq("nombre", cancionActual.artista)
          .maybeSingle(); // Evita error si no hay fila

        if (error) throw error;
        setArtistInfo(data || null);
      } catch (err) {
        console.error("Error cargando info del artista:", err.message);
        setArtistInfo(null);
      } finally {
        setLoadingArtist(false);
      }
    };

    fetchRelatedSongs();
    fetchArtistInfo();
  }, [cancionActual]);

  // Si no hay canción en reproducción
  if (!cancionActual) {
    return (
      <Box
        sx={{
          width: 300,
          borderLeft: "1px solid #333333",
          backgroundColor: "#0d0d0d",
          overflowY: "auto",
          px: 2,
          py: 2,
          color: "white",
        }}
      >
        <Typography variant="subtitle1" color="#b3b3b3">
          No se está reproduciendo nada
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 300,
        borderLeft: "1px solid #333333",
        backgroundColor: "#0d0d0d",
        overflowY: "auto",
        px: 2,
        py: 2,
      }}
    >
      {/* === Sección: Portada y título de la canción === */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 180,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={cancionActual.imagen}
            alt="Portada de la canción"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" color="white">
            {cancionActual.nombre}
          </Typography>
          <Typography variant="subtitle2" color="#b3b3b3">
            {cancionActual.artista}
          </Typography>
        </Box>
      </Box>

      {/* === Sección: Canciones relacionadas === */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
          Canciones relacionadas
        </Typography>
        {loadingRelated ? (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={24} color="inherit" />
          </Box>
        ) : relatedSongs.length === 0 ? (
          <Typography variant="body2" color="#b3b3b3">
            No hay canciones relacionadas
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              pb: 1,
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#333333",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#1e1e1e",
              },
            }}
          >
            {relatedSongs.map((song) => (
              <Card
                key={song.id}
                sx={{
                  minWidth: 120,
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#1e1e1e", transition: "0.3s" },
                }}
              >
                <CardMedia
                  component="img"
                  image={song.imagen}
                  alt={song.nombre}
                  sx={{
                    width: "100%",
                    height: 80,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    variant="body2"
                    color="white"
                    noWrap
                    sx={{ fontSize: 13 }}
                  >
                    {song.nombre}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="#b3b3b3"
                    noWrap
                    sx={{ fontSize: 11 }}
                  >
                    {song.usuarios?.nombre || "Desconocido"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* === Sección: Información sobre el artista === */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
          Información sobre el artista
        </Typography>
        {loadingArtist ? (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={24} color="inherit" />
          </Box>
        ) : artistInfo ? (
          <Box
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
              overflow: "hidden",
              mb: 2,
            }}
          >
            {artistInfo.avatar && (
              <Box
                component="img"
                src={artistInfo.avatar}
                alt="Foto del artista"
                sx={{ width: "100%", height: 120, objectFit: "cover" }}
              />
            )}
            <Box sx={{ p: 1.5 }}>
              <Typography variant="h6" color="white">
                {artistInfo.nombre}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  mt: 1,
                  color: "white",
                  borderColor: "white",
                  textTransform: "none",
                  fontSize: 14,
                  py: 0.5,
                  px: 1.5,
                }}
              >
                Seguir
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="#b3b3b3">
            No hay información del artista
          </Typography>
        )}
      </Box>
    </Box>
  );

  
};

export default ContenidoCancionLateral;
