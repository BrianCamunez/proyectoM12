// src/componentes/ContenidoPlaylist.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Modal,
  Slide,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext"; // Ajusta la ruta si tu context está en otro lugar

const ContenidoPlaylist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Desestructuramos funciones del context
  const { reproducirCancion } = usePlayer();

  useEffect(() => {
    const validarSesion = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/registro");
      }
    };
    validarSesion();
  }, []);

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

  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [showOptionsContent, setShowOptionsContent] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleCloseOptionsModal = () => {
    setShowOptionsContent(false);
    setTimeout(() => {
      setOpenOptionsModal(false);
      setSelectedSong(null);
    }, 300);
  };

  const eliminarCancionDePlaylist = async (cancionId) => {
    const { error } = await supabase
      .from("canciones_playlist")
      .delete()
      .eq("playlist_id", id)
      .eq("cancion_id", cancionId);

    if (error) {
      alert("Error al eliminar la canción");
    } else {
      alert("Canción eliminada");
      setCanciones(canciones.filter((c) => c.id !== cancionId));
      handleCloseOptionsModal();
    }
  };

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
            background:
              "linear-gradient(to bottom,rgb(72, 74, 75) 50%, #121212)",
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
                <MoreHorizIcon
                  sx={{ fontSize: "20px", cursor: "pointer", color: "#aeaeae" }}
                  onClick={() => {
                    setSelectedSong(cancion);
                    setOpenOptionsModal(true);
                    setTimeout(() => setShowOptionsContent(true), 10);
                  }}
                />
              </IconButton>
            </Box>
            {index < canciones.length - 1 && (
              <Divider sx={{ borderColor: "rgba(174,174,174,0.2)" }} />
            )}
          </Box>
        ))}
      </Box>
      <Modal
        open={openOptionsModal}
        onClose={handleCloseOptionsModal}
        sx={{ zIndex: 1300 }}
      >
        <Slide
          direction="up"
          in={showOptionsContent}
          mountOnEnter
          unmountOnExit
        >
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
              onClick={() => eliminarCancionDePlaylist(selectedSong.id)}
            >
              <RemoveCircleOutlineIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">
                  Eliminar de la playlist
                </Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Esta canción será eliminada de la playlist actual
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={handleCloseOptionsModal}
            >
              <Typography fontWeight="bold">Cancelar</Typography>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

export default ContenidoPlaylist;
