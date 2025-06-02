// src/componentes/ContenidoBiblioteca.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { supabase } from "../supabase/supabase";

const ContenidoBiblioteca = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const cargarPlaylists = async () => {
      try {
        // 1) Obtener usuario autenticado
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) return;

        // 2) Obtener id de usuario
        const { data: usuario, error: usuarioError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("email", user.email)
          .single();
        if (usuarioError || !usuario) return;

        // 3) Obtener playlists de ese usuario
        const { data: playlistsData, error: playlistError } = await supabase
          .from("playlist")
          .select("id, nombre, imagen")
          .eq("id_usuario", usuario.id);
        if (playlistError) {
          console.error("Error cargando playlists:", playlistError);
          return;
        }
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error en cargarPlaylists:", error.message);
      }
    };

    cargarPlaylists();
  }, []);

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        borderRight: "1px solid #333",
        backgroundColor: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      {/* 1. Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Tu biblioteca
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              bgcolor: "#1db954",
              "&:hover": { bgcolor: "#1ed760" },
              height: 32,
              p: "4px 8px",
              mr: 1,
            }}
          >
            Crear
          </Button>
          <IconButton size="small" sx={{ color: "white" }}>
            <OpenInFullIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* 2. Filtros */}
      <Box sx={{ px: 2, display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Chip label="Listas" clickable size="small" sx={{ color: "white", bgcolor: "#1e1e1e" }} />
        <Chip label="Artistas" clickable size="small" sx={{ color: "white", bgcolor: "#1e1e1e" }} />
      </Box>

      {/* 3. Búsqueda */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#121212",
          borderRadius: 1,
          mx: 2,
          mb: 1.5,
        }}
      >
        <SearchIcon sx={{ color: "#b3b3b3", mr: 1 }} />
        <InputBase
          placeholder="Buscar en tu biblioteca"
          sx={{ color: "white", fontSize: 14, width: "100%" }}
          inputProps={{ "aria-label": "buscar en tu biblioteca" }}
        />
      </Box>

      {/* 4. Recientes */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" color="#b3b3b3">
          Recientes
        </Typography>
        <IconButton size="small" sx={{ color: "white" }}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ bgcolor: "#333", mx: 2, mb: 1 }} />

      {/* 5. Lista de playlists */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#333",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#0d0d0d",
          },
        }}
      >
        <List disablePadding>
          {playlists.map((pl, idx) => (
            <React.Fragment key={pl.id}>
              {/* Envolvemos el ListItem en Link */}
              <Link to={`/playlist/${pl.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem
                  sx={{
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#212121" },
                  }}
                >
                  <ListItemAvatar>
                    {pl.imagen ? (
                      <Avatar
                        variant="square"
                        src={pl.imagen}
                        sx={{ width: 40, height: 40, bgcolor: "#1e1e1e" }}
                      />
                    ) : (
                      <Avatar
                        variant="square"
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "#1e1e1e",
                          color: "#b3b3b3",
                          fontSize: 20,
                        }}
                      >
                        🎵
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {pl.nombre}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
              {idx < playlists.length - 1 && (
                <Divider variant="fullWidth" component="li" sx={{ bgcolor: "#333", mx: 2 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ContenidoBiblioteca;
