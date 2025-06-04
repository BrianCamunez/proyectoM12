// src/componentes/ContenidoGenero.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Grid,
  Modal,
  Slide,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IosShareIcon from "@mui/icons-material/IosShare";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import { usePlayer } from "../context/PlayerContext";

const ContenidoGenero = () => {
  const { nombre } = useParams(); // Nombre del género desde la URL
  const navigate = useNavigate();
  const { reproducirCancion } = usePlayer();

  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showOptionsContent, setShowOptionsContent] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [openSelectPlaylistModal, setOpenSelectPlaylistModal] = useState(false);
  const [playlistsUsuario, setPlaylistsUsuario] = useState([]);

  useEffect(() => {
    const validarSesion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/registro");
      }
    };
    validarSesion();
  }, []);

  // Función para cerrar el modal de opciones
  const handleCloseOptionsModal = () => {
    setShowOptionsContent(false);
    setTimeout(() => {
      setOpenOptionsModal(false);
      setSelectedSong(null);
    }, 300);
  };

  // Traer las playlists del usuario actual (para el modal “Guardar en playlist”)
  const fetchUserPlaylists = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", user.email)
      .single();
    if (!usuario) return;

    const { data, error } = await supabase
      .from("playlist")
      .select("id, nombre, imagen")
      .eq("id_usuario", usuario.id);
    if (!error) {
      setPlaylistsUsuario(data);
    } else {
      console.error("Error cargando playlists:", error);
    }
  };

  // Al hacer clic en “Añadir a playlist” guardamos la canción en la tabla canciones_playlist
  const añadirCancionAPlaylist = async (playlistId, cancionId) => {
    if (!cancionId) {
      alert("No se pudo identificar la canción.");
      return;
    }
    try {
      // Verificar si ya existe
      const { data: existente, error: selectError } = await supabase
        .from("canciones_playlist")
        .select("id")
        .eq("playlist_id", playlistId)
        .eq("cancion_id", cancionId)
        .maybeSingle();
      if (selectError) {
        alert("Error SELECT: " + selectError.message);
        return;
      }
      if (existente) {
        alert("La canción ya está en esta playlist.");
        setOpenSelectPlaylistModal(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("canciones_playlist")
        .insert({
          playlist_id: playlistId,
          cancion_id: cancionId,
        });
      if (insertError) {
        alert("Error INSERT: " + insertError.message);
      } else {
        alert("Canción añadida correctamente.");
        setOpenSelectPlaylistModal(false);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Error inesperado: " + err.message);
    }
  };

  // Volver a la pantalla anterior
  const handleBackClick = () => navigate(-1);

  useEffect(() => {
    // Traer las canciones cuyo campo "genero" coincide con el nombre de la URL
    const fetchCanciones = async () => {
      try {
        const { data, error } = await supabase
          .from("canciones")
          .select("id, nombre, imagen, cancion, usuarios(nombre)")
          .eq("genero", decodeURIComponent(nombre));
        if (error) throw error;
        setCanciones(data || []);
      } catch (err) {
        console.error("Error al obtener canciones:", err.message);
        setCanciones([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCanciones();
  }, [nombre]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        color="white"
        sx={{ backgroundColor: "#121212", flexGrow: 1 }}
      >
        Cargando...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#121212",
        px: 3,
        py: 2,
        height: "100%",
        // Eliminé overflowY y personalización de scrollbar, pues el padre ya maneja el desplazamiento
      }}
    >
      {/*** Encabezado de la sección ***/}
      <Box mb={3} position="relative">
        <IconButton
          onClick={handleBackClick}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "white",
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" color="white">
            {nombre}
          </Typography>
          <Typography variant="body2" color="#b3b3b3">
            {canciones.length} canciones encontradas
          </Typography>
        </Box>
      </Box>

      {/*** Lista de canciones ***/}
      <Box>
        {canciones.map((cancion, index) => (
          <Box key={cancion.id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={1}
              sx={{
                "&:hover": {
                  backgroundColor: "#2c2c2c",
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={cancion.imagen}
                  variant="square"
                  sx={{ width: 56, height: 56, borderRadius: 1 }}
                />
                <Box>
                  <Typography color="white" fontSize="16px">
                    {cancion.nombre}
                  </Typography>
                  <Typography color="#aeaeae" fontSize="14px">
                    {cancion.usuarios?.nombre || "Artista desconocido"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={() =>
                    reproducirCancion(
                      {
                        id: cancion.id,
                        nombre: cancion.nombre,
                        artista: cancion.usuarios?.nombre || "Desconocido",
                        imagen: cancion.imagen,
                        cancion: cancion.cancion,
                      },
                      canciones.map((c) => ({
                        id: c.id,
                        nombre: c.nombre,
                        artista: c.usuarios?.nombre || "Desconocido",
                        imagen: c.imagen,
                        cancion: c.cancion,
                      }))
                    )
                  }
                  sx={{ color: "#1db954" }}
                >
                  <PlayCircleIcon />
                </IconButton>
                <CheckCircleIcon sx={{ color: "#aeaeae", fontSize: 20 }} />
                <IconButton
                  onClick={() => {
                    setSelectedSong(cancion);
                    setOpenOptionsModal(true);
                    setTimeout(() => setShowOptionsContent(true), 10);
                  }}
                  sx={{ color: "#aeaeae", fontSize: 24 }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>
            {index < canciones.length - 1 && (
              <Divider sx={{ borderColor: "rgba(174,174,174,0.2)" }} />
            )}
          </Box>
        ))}
      </Box>

      {/*** Sección “También puede que te gusten” ***/}
      { canciones.length > 0 && (
        <Box mt={4}>
        <Typography variant="h6" color="white" mb={2}>
          También puede que te gusten
        </Typography>
        <Grid container spacing={2}>
          {/* Ejemplo: 6 sugerencias en cuadrícula de 3 columnas */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <Grid item xs={4} key={idx}>
              <Card
                sx={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: 2,
                  boxShadow: "none",
                  cursor: "pointer",
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": { transform: "scale(1.02)", transition: "0.2s" },
                }}
              >
                <CardMedia
                  component="img"
                  image="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"
                  alt="Sugerencia"
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent sx={{ p: 1, textAlign: "center", flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    noWrap
                  >
                    Playlist Sugerida
                  </Typography>
                  <Typography variant="caption" color="#b3b3b3" noWrap>
                    Descripción corta
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      )}
          

      {/*** Modales (Opciones / Seleccionar playlist) ***/}
      <Modal
        open={openOptionsModal}
        onClose={() => {
          setShowOptionsContent(false);
          setTimeout(() => {
            setOpenOptionsModal(false);
            setSelectedSong(null);
          }, 300);
        }}
        sx={{ zIndex: 1300 }}
      >
        <Slide direction="up" in={showOptionsContent} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "#121212",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              color: "white",
              px: 3,
              pt: 3,
              pb: 4,
              width: "100%",
              maxHeight: "50vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <Typography fontWeight="bold" fontSize={18} mb={2}>
              Opciones para “{selectedSong?.nombre}”
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={async () => {
                setSelectedSongId(selectedSong.id);
                await fetchUserPlaylists();
                setOpenSelectPlaylistModal(true);
                handleCloseOptionsModal();
              }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">Guardar en playlist</Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Añade esta canción a una playlist
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={() => handleCloseOptionsModal()}
            >
              <CheckCircleIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">Añadir a tu biblioteca</Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Guarda esta canción en tu perfil
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={() => handleCloseOptionsModal()}
            >
              <QueueMusicIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">Añadir a la cola</Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Se reproducirá después
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={() => handleCloseOptionsModal()}
            >
              <IosShareIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">Compartir</Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Envía esta canción a tus amigos
                </Typography>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Modal>

      <Modal
        open={openSelectPlaylistModal}
        onClose={() => setOpenSelectPlaylistModal(false)}
        sx={{ zIndex: 1400 }}
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#121212",
            color: "white",
            p: 3,
            borderRadius: 2,
            width: "90%",
            maxWidth: 400,
          }}
        >
          <Typography fontWeight="bold" fontSize={18} mb={2}>
            Selecciona una playlist
          </Typography>
          {playlistsUsuario.length === 0 ? (
            <Typography>No has creado playlists aún.</Typography>
          ) : (
            playlistsUsuario.map((pl) => (
              <Box
                key={pl.id}
                onClick={() => añadirCancionAPlaylist(pl.id, selectedSongId)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 1.5,
                  borderBottom: "1px solid #333",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#1a1a1a" },
                }}
              >
                <Box
                  component="img"
                  src={pl.imagen || "https://via.placeholder.com/50"}
                  alt="imagen"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
                <Typography fontWeight="500">{pl.nombre}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ContenidoGenero;
