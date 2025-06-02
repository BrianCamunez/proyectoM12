// src/componentes/ContenidoPlaylist.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { supabase } from "../supabase/supabase";
import { usePlayer } from "../context/PlayerContext"; // Ajusta la ruta si tu context está en otro lugar

const ContenidoPlaylist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Desestructuramos funciones del context
  const { reproducirCancion } = usePlayer();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data, error } = await supabase
        .from("playlist")
        .select("nombre, imagen")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error al cargar la playlist:", error);
      } else {
        setPlaylist(data);
      }
      setLoading(false);
    };

    const fetchCanciones = async () => {
          const { data, error } = await supabase
            .from("canciones_playlist")
            .select(
              "cancion_id, canciones ( id, nombre, imagen, cancion, usuarios ( nombre ) )"
            )
            .eq("playlist_id", id);
    
          if (error) {
            console.error("Error al obtener canciones de la playlist:", error);
          } else {
            const cancionesFormateadas = data.map((item) => item.canciones);
            setCanciones(cancionesFormateadas);
          }
        };

    fetchPlaylist();
    fetchCanciones();
  }, [id]);

  if (loading) return null;

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#121212",
        height: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#2a2a2a",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#767612",
          borderRadius: "10px",
          border: "2px solid #161246",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#561234",
        },
      }}
    >
      {/* ================= Encabezado de la playlist ================= */}
      {playlist && (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            px: 3,
            height: 300,
            background: "linear-gradient(to bottom, #64B5F6 50%, #121212)",
          }}
        >
          <Box
            component="img"
            src={playlist.imagen}
            alt="imagen de la playlist"
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              objectFit: "cover",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
            }}
          />
          <Box ml={3} mb={2}>
            <Typography variant="caption" color="#aeaeae">
              Lista
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="white">
              {playlist.nombre}
            </Typography>
          </Box>
        </Box>
      )}

      {/* ================= Lista simplificada de canciones ================= */}
      <Box px={3} py={2}>
        {canciones.map((cancion, index) => (
          <Box key={cancion.id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={1}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#2c2c2c",
                },
              }}
              onClick={() => {
                // Al hacer clic, reproducimos la canción y pasamos la lista completa
                reproducirCancion(cancion, canciones);
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  src={cancion.imagen}
                  variant="square"
                  sx={{ width: 56, height: 56, borderRadius: 1, mr: 2 }}
                />
                <Box>
                  <Typography color="white" fontSize="16px">
                    {cancion.nombre}
                  </Typography>
                  <Typography color="#aeaeae" fontSize="14px">
                    {cancion.usuarios?.nombre || "Desconocido"}
                  </Typography>
                </Box>
              </Box>
              <IconButton>
                <MoreHorizIcon sx={{ color: "#aeaeae" }} />
              </IconButton>
            </Box>
            {index < canciones.length - 1 && (
              <Divider sx={{ borderColor: "rgba(174,174,174,0.2)" }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContenidoPlaylist;
