// src/componentes/InfoCancionSidebar.jsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ContenidoCancionLateral = () => {
  const videoMusicales = [
    {
      id: 1,
      titulo: "It's Gonna Be Me",
      artista: "*NSYNC",
      thumbnail: "https://via.placeholder.com/120x80?text=Video+1",
    },
    {
      id: 2,
      titulo: "This I Promise You",
      artista: "*NSYNC",
      thumbnail: "https://via.placeholder.com/120x80?text=Video+2",
    },
    {
      id: 3,
      titulo: "Bye Bye Bye",
      artista: "*NSYNC",
      thumbnail: "https://via.placeholder.com/120x80?text=Video+3",
    },
    {
      id: 4,
      titulo: "Tearing Up My Heart",
      artista: "*NSYNC",
      thumbnail: "https://via.placeholder.com/120x80?text=Video+4",
    },
    {
      id: 5,
      titulo: "Pop",
      artista: "*NSYNC",
      thumbnail: "https://via.placeholder.com/120x80?text=Video+5",
    },
  ];

  const creditos = [
    {
      id: 1,
      nombre: "*NSYNC",
      rol: "Artista Principal",
    },
    {
      id: 2,
      nombre: "Kristian Lundin",
      rol: "Composición, Letrista, Productor",
    },
    {
      id: 3,
      nombre: "Jacob Schulze",
      rol: "Composición, Letrista",
    },
    {
      id: 4,
      nombre: "Ronald Novar",
      rol: "Productor",
    },
    {
      id: 5,
      nombre: "Jeff Thall",
      rol: "Ingeniero de mezcla",
    },
  ];

  return (
    <Box
      sx={{
        width: 300,
        borderLeft: "1px solid #333333",
        backgroundColor: "#0d0d0d",
        overflowY: "auto",
        px: 2,
        py: 2,
        // Scroll vertical personalizado
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#1e1e1e",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#333333",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555555",
        },
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
            src="https://via.placeholder.com/300x180?text=Portada+Canción"
            alt="Portada de la canción"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Button
            variant="contained"
            startIcon={<PlayCircleFilledWhiteIcon />}
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              textTransform: "none",
              bgcolor: "#1db954",
              "&:hover": { bgcolor: "#1ed760" },
              fontSize: 14,
              py: 0.5,
              px: 1.5,
            }}
          >
            Cambiar a video
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" color="white">
            Bye Bye Bye
          </Typography>
          <Typography variant="subtitle2" color="#b3b3b3">
            *NSYNC
          </Typography>
        </Box>
      </Box>

      {/* === Sección: Videos musicales relacionados === */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
          Videos musicales relacionados
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            pb: 1,
            // Scroll horizontal personalizado
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
          {videoMusicales.map((video) => (
            <Card
              key={video.id}
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
                image={video.thumbnail}
                alt={video.titulo}
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
                  {video.titulo}
                </Typography>
                <Typography
                  variant="caption"
                  color="#b3b3b3"
                  noWrap
                  sx={{ fontSize: 11 }}
                >
                  {video.artista}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* === Sección: Información sobre el artista === */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
          Información sobre el artista
        </Typography>
        <Box
          sx={{
            backgroundColor: "#1e1e1e",
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src="https://via.placeholder.com/300x120?text=Foto+Artista"
            alt="Foto del artista"
            sx={{ width: "100%", height: 120, objectFit: "cover" }}
          />
          <Box sx={{ p: 1.5 }}>
            <Typography variant="h6" color="white">
              *NSYNC
            </Typography>
            <Typography variant="body2" color="#b3b3b3" sx={{ mb: 1 }}>
              15.035.090 oyentes mensuales
            </Typography>
            <Typography variant="body2" color="#b3b3b3" sx={{ fontSize: 13 }}>
              One of the top boy bands of its era, *NSYNC helped to define the
              sound of danceable, R&B-influenced Y2K pop in the late ’90s and
              early 2000s.
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
      </Box>

      {/* === Sección: Créditos === */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" color="white">
            Créditos
          </Typography>
          <Typography variant="body2" color="#b3b3b3" sx={{ fontSize: 13 }}>
            Mostrar todos
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1e1e1e",
            borderRadius: 2,
            p: 2,
            "& > :not(:last-child)": {
              mb: 1.5,
            },
          }}
        >
          {creditos.map((c) => (
            <Box
              key={c.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="body1" color="white" sx={{ fontSize: 14 }}>
                  {c.nombre}
                </Typography>
                <Typography
                  variant="body2"
                  color="#b3b3b3"
                  sx={{ fontSize: 12 }}
                >
                  {c.rol}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  textTransform: "none",
                  fontSize: 12,
                  py: 0.3,
                  px: 1.2,
                }}
              >
                Seguir
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ContenidoCancionLateral;
