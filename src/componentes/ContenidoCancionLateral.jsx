// src/componentes/InfoCancionSidebar.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { usePlayer } from "../context/PlayerContext";
import { supabase } from "../supabase/supabase";

const ContenidoCancionLateral = () => {

  const { cancionActual } = usePlayer();

  const [artistaInfo, setArtistaInfo] = useState(null);
  const [cancionesRelacionadas, setCancionesRelacionadas] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    // Ahora usamos cancionActual.usuarios.nombre como artista
    const nombreArtista = cancionActual?.usuarios?.nombre;
    if (!nombreArtista) {
      return;
    }

    const cargarDatos = async () => {
      // 1. Obtener información del artista (id, avatar, nombre)
      setLoadingArtist(true);
      let artista = null;
      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("id, avatar, nombre")
          .eq("nombre", nombreArtista)
          .single();

        if (error) throw error;
        artista = data;
        setArtistaInfo(data);
      } catch (err) {
        setArtistaInfo(null);
      } finally {
        setLoadingArtist(false);
      }

      // 2. Obtener hasta 3 canciones del mismo artista, excluyendo la actual
      if (!artista?.id) {
        setCancionesRelacionadas([]);
        return;
      }

      setLoadingRelated(true);
      try {
        const { data, error } = await supabase
          .from("canciones")
          .select("id, nombre, imagen")
          .eq("artista", artista.id)
          .neq("id", cancionActual.id)
          .limit(3);

        console.log("Canciones relacionadas (Supabase):", data, "Error:", error);

        if (error) throw error;
        setCancionesRelacionadas(data || []);
      } catch (err) {
        console.error("Error cargando canciones relacionadas:", err.message);
        setCancionesRelacionadas([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    cargarDatos();
  }, [cancionActual]);

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
          Descubre más de {cancionActual.artista}
        </Typography>
        {loadingRelated ? (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={24} color="inherit" />
          </Box>
        ) : cancionesRelacionadas.length === 0 ? (
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
            {cancionesRelacionadas.map((rel) => (
              <Card
                key={rel.id}
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
                  image={rel.imagen}
                  alt={rel.nombre}
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
                    {rel.nombre}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="#b3b3b3"
                    noWrap
                    sx={{ fontSize: 11 }}
                  >
                    {cancionActual.artista}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* === Sección: Información sobre el artista === */}
      <Box mt={2} borderRadius={3} sx={{ backgroundColor: "#121212" }}>
        <Box
          mt={2}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#121212",
          }}
        >
          {/* Contenedor relativo para superponer el texto sobre la imagen */}
          <Box sx={{ position: "relative" }}>
            {/* === Imagen del artista/canción === */}
            <Box
              component="img"
              src={artistaInfo?.avatar}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* === Texto “Información del artista” posicionado un poco más abajo === */}
            <Typography
              fontWeight="bold"
              fontSize="14px"
              color="white"
              sx={{
                position: "absolute",
                top: 16,    // ajusta este valor para bajarlo más o menos
                left: 16,   // desplazamiento desde el borde izquierdo // opcional: para que resalte sobre la imagen
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              Información del artista
            </Typography>
          </Box>

          {/* === Resto de la info debajo de la imagen === */}
          <Box px={2} py={2} sx={{ backgroundColor: "#121212" }}>
            
             <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Box fontWeight="bold" fontSize="18px" color="white">
                    {artistaInfo?.nombre || cancionActual.artista}
                  </Box>
                  <Box fontSize="14px" color="#b3b3b3">
                    {artistaInfo?.oyentes || "0"} oyentes mensuales
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    textTransform: "none",
                    borderRadius: "20px",
                    fontSize: "13px",
                    px: 2,
                  }}
                >
                  Seguir
                </Button>
              </Box>
               <Box mt={2} fontSize="14px" color="#b3b3b3">
                {artistaInfo?.descripcion || "Sin descripción."}
              </Box>
          </Box>
        </Box>
      </Box>

    </Box>
  );

};

export default ContenidoCancionLateral;
