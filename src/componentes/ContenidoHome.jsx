// src/componentes/MainContent.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";

const ContenidoHome = () => {

  const artistas = [
    { id: 1, nombre: "Sän-Z" },
    { id: 2, nombre: "K/DA" },
    { id: 3, nombre: "League of Legends" },
    { id: 4, nombre: "Odetari" },
    { id: 5, nombre: "TheFatRat" },
  ];

  const descubrimientos = [
    {
      id: 1,
      titulo: "Concentración Perfecta",
      descripcion: "Concéntrate al máximo, sin distracciones.",
    },
    {
      id: 2,
      titulo: "Viral España 2025",
      descripcion: "Así suena internet, con Luck Ra.",
    },
    {
      id: 3,
      titulo: "Chill Lofi Study Beats",
      descripcion: "The perfect study beats. Find your focus.",
    },
    {
      id: 4,
      titulo: "Los 2000 España",
      descripcion: "Lo mejor de la primera década del milenio.",
    },
    {
      id: 5,
      titulo: "House Focus",
      descripcion: "Instrumental house for when you need to focus.",
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 3,              // 24px
        pl: 2,              // 16px
        pr: 1,              // 8px
        backgroundColor: "#121212",
        borderRadius: 2,
        height: "100%",
        overflowY: "auto",
        // ----- SCROLL VERTICAL PERSONALIZADO -----
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#1e1e1e",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#333",       // gris en lugar de verde
          borderRadius: "10px",
          border: "2px solid #121212",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {/* === Sección: Artistas populares (fila horizontal) === */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,   // 3 * 8px = 24px
          py: 2,
          mb: 4,
          // ----- SCROLL HORIZONTAL PERSONALIZADO -----
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#333",   // gris en lugar de verde
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1e1e1e",
          },
        }}
      >
        {artistas.map((artista) => {
          // usamos las siglas para el avatar (primera letra)
          const letra = artista.nombre.charAt(0).toUpperCase();
          return (
            <Box
              key={artista.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 120,
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 1,
                  bgcolor: "#2a2a2a", // fondo gris oscuro
                  color: "#fff",
                  fontSize: 32,
                }}
              >
                {letra}
              </Avatar>
              <Typography
                variant="body2"
                color="white"
                noWrap
                sx={{ textAlign: "center", maxWidth: 120 }}
              >
                {artista.nombre}
              </Typography>
              <Typography variant="caption" color="#b3b3b3">
                Artista
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* === Sección: “Lo que no te puedes perder” === */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" color="white">
          Lo que no te puedes perder
        </Typography>
        <Typography variant="body2" color="#b3b3b3">
          Mostrar todos
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3, // 24px
          pb: 2,
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#333",   // gris
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1e1e1e",
          },
        }}
      >
        {descubrimientos.map((item) => (
          <Card
            key={item.id}
            sx={{
              width: 150,
              backgroundColor: "transparent",
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#1e1e1e", transition: "0.3s" },
            }}
          >
            {/* En lugar de imagen rotas, dejamos un placeholder gris */}
            <Box
              sx={{
                width: "100%",
                height: 150,
                borderRadius: 2,
                backgroundColor: "#2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6" color="#555">
                🎵
              </Typography>
            </Box>
            <CardContent sx={{ p: 1 }}>
              <Typography variant="body2" color="white" noWrap>
                {item.titulo}
              </Typography>
              <Typography variant="caption" color="#b3b3b3" noWrap>
                {item.descripcion}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );


};

export default ContenidoHome;
