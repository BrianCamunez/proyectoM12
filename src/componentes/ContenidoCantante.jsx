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
  Modal,
  Slide,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import IosShareIcon from "@mui/icons-material/IosShare";
import { supabase } from "../supabase/supabase";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

const ContenidoCantante = () => {
  const { reproducirCancion } = usePlayer();
  const { id } = useParams(); // ID del artista
  const [artista, setArtista] = useState(null);
  const [canciones, setCanciones] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const navigate = useNavigate();

  // --- Estados para la lógica de “Seguir” ---
  const [currentUserId, setCurrentUserId] = useState(null);
  const [following, setFollowing] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(true);
  const [loadingFollowState, setLoadingFollowState] = useState(false);

  // --- Estados para el modal de opciones ---
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [showOptionsContent, setShowOptionsContent] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const handleCloseOptionsModal = () => {
    setShowOptionsContent(false);
    setTimeout(() => {
      setOpenOptionsModal(false);
      setSelectedSong(null);
    }, 300);
  };

   const [openSelectPlaylistModal, setOpenSelectPlaylistModal] = useState(false);
    const [playlistsUsuario, setPlaylistsUsuario] = useState([]);

    const fetchUserPlaylists = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data: usuario } = await supabase
            .from("usuarios")
            .select("id")
            .eq("email", user.email)
            .single();

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

    const añadirCancionAPlaylist = async (playlistId, cancionId) => {
        if (!cancionId) {
            alert("No se pudo identificar la canción.");
            return;
        }

        try {
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
            console.error("ERROR inesperado:", err);
            alert("Error inesperado: " + err.message);
        }
    };

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
          .select(
            `
            id,
            nombre,
            imagen,
            cancion,
            usuarios (
              nombre
            )
          `
          )
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

  useEffect(() => {
    const fetchUserId = async () => {
      setLoadingUserId(true);
      const {
        data: { user },
        error: authErr,
      } = await supabase.auth.getUser();
      if (authErr || !user) {
        console.error("Error en getUser():", authErr);
        setLoadingUserId(false);
        return;
      }
      const { data: usuario, error: usrErr } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", user.email)
        .single();
      if (usrErr || !usuario) {
        console.error("No se encontró registro en 'usuarios':", usrErr);
        setLoadingUserId(false);
        return;
      }
      setCurrentUserId(usuario.id);
      setLoadingUserId(false);
    };

    fetchUserId();
  }, []);

  // 2) Consultar si el usuario ya sigue a este artista
  useEffect(() => {
    if (loadingUserId) return;
    if (!currentUserId) return;
    if (!id) return;

    const checkFollowing = async () => {
      setLoadingFollowState(true);
      const { data, error } = await supabase
        .from("artista_seguido")
        .select("id")
        .eq("id_usuario", currentUserId)
        .eq("id_artista", Number(id))
        .maybeSingle();
      if (error) {
        console.error("Error en consulta artista_seguido:", error);
        setLoadingFollowState(false);
        return;
      }
      setFollowing(!!data);
      setLoadingFollowState(false);
    };

    checkFollowing();
  }, [currentUserId, loadingUserId, id]);

  const toggleFollow = async () => {
    if (loadingUserId) return;
    if (!currentUserId) return;
    if (!id) return;

    if (!following) {
      // Insertar nuevo seguimiento
      const { error: insertErr } = await supabase
        .from("artista_seguido")
        .insert({
          id_usuario: currentUserId,
          id_artista: Number(id),
        });
      if (insertErr) {
        console.error("Error insertando en artista_seguido:", insertErr);
      } else {
        setFollowing(true);
      }
    } else {
      // Eliminar seguimiento
      const { error: deleteErr } = await supabase
        .from("artista_seguido")
        .delete()
        .eq("id_usuario", currentUserId)
        .eq("id_artista", Number(id));
      if (deleteErr) {
        console.error("Error borrando en artista_seguido:", deleteErr);
      } else {
        setFollowing(false);
      }
    }
  };

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
        height: "100%",
      }}
    >
      {/* === Cabecera del artista === */}
      <Box
        sx={{
          position: "relative",
          height: 300,
          backgroundImage: artista.avatar ? `url(${artista.avatar})` : "none",
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
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {/* --- Botón Seguir / Siguiendo --- */}
              {!loadingUserId && (
                <Button
                  variant={following ? "contained" : "outlined"}
                  onClick={toggleFollow}
                  sx={{
                    textTransform: "none",
                    borderColor: "#b3b3b3",
                    color: following ? "black" : "white",
                    backgroundColor: following ? "#b3b3b3" : "transparent",
                    "&:hover": {
                      borderColor: following ? "#999" : "#fff",
                      backgroundColor: following
                        ? "#999"
                        : "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {following ? "Siguiendo" : "Seguir"}
                </Button>
              )}

              {/* Spinner si está cargando ID de usuario o estado de seguimiento */}
              {(loadingUserId || loadingFollowState) && (
                <CircularProgress size={24} sx={{ color: "white", ml: 1 }} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* === Sección: Canciones === */}
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
          <Typography color="#b3b3b3">No hay canciones disponibles.</Typography>
        ) : (
          canciones.map((song, index) => (
            <Box key={song.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={1}
                sx={{
                  "&:hover": { backgroundColor: "#2c2c2c" },
                }}
              >
                {/* — 1) Carátula y título (clicables)— */}
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={song.imagen}
                    variant="square"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      reproducirCancion(
                        {
                          id: song.id,
                          nombre: song.nombre,
                          artista: song.usuarios?.nombre || "Desconocido",
                          imagen: song.imagen,
                          cancion: song.cancion,
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
                  />
                  <Box
                    onClick={() =>
                      reproducirCancion(
                        {
                          id: song.id,
                          nombre: song.nombre,
                          artista: song.usuarios?.nombre || "Desconocido",
                          imagen: song.imagen,
                          cancion: song.cancion,
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
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography color="white" fontSize="16px">
                      {song.nombre}
                    </Typography>
                    <Typography color="#aeaeae" fontSize="14px">
                      {song.usuarios?.nombre || "Artista desconocido"}
                    </Typography>
                  </Box>
                </Box>

                {/* — 2) Iconos de acciones — */}
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    onClick={() =>
                      reproducirCancion(
                        {
                          id: song.id,
                          nombre: song.nombre,
                          artista: song.usuarios?.nombre || "Desconocido",
                          imagen: song.imagen,
                          cancion: song.cancion,
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
                    <PlayArrowIcon />
                  </IconButton>
                  <CheckCircleIcon sx={{ color: "#aeaeae", fontSize: 20 }} />
                  <IconButton
                    onClick={() => {
                      // aquí tu lógica de “Más opciones” si la tienes
                    }}
                    sx={{ color: "#aeaeae", fontSize: 24 }}
                  >
                    <MoreHorizIcon
                      sx={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#aeaeae",
                      }}
                      onClick={() => {
                        setSelectedSong(song);
                        setOpenOptionsModal(true);
                        setTimeout(() => setShowOptionsContent(true), 10);
                      }}
                    />
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
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <Typography fontWeight="bold" fontSize={18} mb={2}>
              Opciones para {selectedSong?.nombre}
            </Typography>

            {/* Guardar en playlist */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={async () => {
                setSelectedSongId(selectedSong.id); // 💾 guardar solo el ID
                await fetchUserPlaylists();
                setOpenSelectPlaylistModal(true);
                handleCloseOptionsModal(); // esto sí puede limpiar selectedSong ahora
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

            {/* Añadir a tu biblioteca */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={handleCloseOptionsModal}
            >
              <CheckCircleIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">
                  Añadir a tu biblioteca
                </Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Guarda esta canción en tu perfil
                </Typography>
              </Box>
            </Box>

            {/* Añadir a la cola */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={handleCloseOptionsModal}
            >
              <QueueMusicIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">Añadir a la cola</Typography>
                <Typography fontSize={13} color="#b3b3b3">
                  Se reproducirá después
                </Typography>
              </Box>
            </Box>

            {/* Compartir */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              sx={{ cursor: "pointer" }}
              onClick={handleCloseOptionsModal}
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
            playlistsUsuario.map((playlist) => (
              <Box
                key={playlist.id}
                onClick={() => {
                  añadirCancionAPlaylist(playlist.id, selectedSongId);
                }}
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
                  src={playlist.imagen || "https://via.placeholder.com/50"}
                  alt="imagen"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
                <Typography fontWeight="500">{playlist.nombre}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ContenidoCantante;
