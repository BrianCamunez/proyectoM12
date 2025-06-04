import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Button,
  IconButton,
  Modal,
  Slide,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { usePlayer } from "../../context/PlayerContext"; // Asegúrate de tener este hook disponible
import NavbarMobile from "./NavbarMobile"; // Asegúrate de tener este componente de navegación móvil
import MenuAbajoMobile from "./MenuAbajoMobile";
import ReproductorMobile from "./ReproductorMobile";

const ContenidoCantanteMobile = () => {
  const navigate = useNavigate();
  const { id: artistaId } = useParams();

  // --- Estados para datos generales ---
  const [loadingData, setLoadingData] = useState(true);

  // Datos del “artista” (usuario)
  const [artist, setArtist] = useState(null);

  // Lista de canciones (tabla “canciones”) con subconsulta a usuarios(nombre)
  const [songs, setSongs] = useState([]);

  // Lista de playlists (tabla “playlists”) – opcional si lo necesitas
  const [playlists, setPlaylists] = useState([]);

  // --- Estados para la lógica de “Seguir” ---
  const [currentUserId, setCurrentUserId] = useState(null);
  const [following, setFollowing] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(true);
  const [loadingFollowState, setLoadingFollowState] = useState(false);

  // --- Estados para el modal de opciones de canción ---
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [showOptionsContent, setShowOptionsContent] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // (Opcional) Para la funcionalidad “Añadir a playlist”
  const [openSelectPlaylistModal, setOpenSelectPlaylistModal] = useState(false);
  const [playlistsUsuario, setPlaylistsUsuario] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  // Contexto para reproducir canciones
  const { reproducirCancion } = usePlayer();

  // --------------------------------------------
  // 1) Carga de datos del artista, canciones y playlists
  // --------------------------------------------
  useEffect(() => {
    if (!artistaId) return;

    const fetchData = async () => {
      setLoadingData(true);

      // 1.a) Datos del usuario (artista)
      const { data: artistData, error: artistErr } = await supabase
        .from("usuarios")
        .select("nombre, avatar")
        .eq("id", Number(artistaId))
        .single();
      if (artistErr) {
        console.error("Error obteniendo datos de usuario:", artistErr);
      } else {
        setArtist(artistData);
      }

      // 1.b) Canciones del artista, incluyendo nombre del usuario (artista) anidado
      const { data: songsData, error: songsErr } = await supabase
        .from("canciones")
        .select("id, nombre, imagen, cancion, usuarios ( nombre )")
        .eq("artista", Number(artistaId));
      if (songsErr) {
        console.error("Error obteniendo canciones:", songsErr);
      } else {
        setSongs(songsData || []);
      }

      // 1.c) Playlists asociadas al artista (opcional)
      const { data: playlistsData, error: playlistsErr } = await supabase
        .from("playlist")
        .select("id, nombre, imagen")
        .eq("id_usuario", Number(artistaId));
      if (playlistsErr) {
        console.error("Error obteniendo playlists:", playlistsErr);
      } else {
        setPlaylists(playlistsData || []);
      }

      setLoadingData(false);
    };

    fetchData();
  }, [artistaId]);

  // --------------------------------------------
  // 2) Lógica de “Seguir”
  // --------------------------------------------
  useEffect(() => {
    const fetchUserId = async () => {
      setLoadingUserId(true);
      const {
        data: { user },
        error: authErr,
      } = await supabase.auth.getUser();
      if (authErr) {
        console.error("Error en getUser():", authErr);
        setLoadingUserId(false);
        return;
      }
      if (!user) {
        console.warn("No hay usuario autenticado");
        setLoadingUserId(false);
        return;
      }
      const { data: usuario, error: usrErr } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", user.email)
        .single();
      if (usrErr) {
        console.error("Error buscando en tabla usuarios:", usrErr);
        setLoadingUserId(false);
        return;
      }
      if (!usuario) {
        console.warn("No se encontró registro en 'usuarios' para", user.email);
        setLoadingUserId(false);
        return;
      }
      setCurrentUserId(usuario.id);
      setLoadingUserId(false);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (loadingUserId) return;
    if (!currentUserId) return;
    if (!artistaId) return;

    const checkFollowing = async () => {
      setLoadingFollowState(true);
      const { data, error } = await supabase
        .from("artista_seguido")
        .select("id")
        .eq("id_usuario", currentUserId)
        .eq("id_artista", Number(artistaId))
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
  }, [currentUserId, loadingUserId, artistaId]);

  const toggleFollow = async () => {
    if (loadingUserId) return;
    if (!currentUserId) return;
    if (!artistaId) return;

    if (!following) {
      const { error: insertErr } = await supabase
        .from("artista_seguido")
        .insert({
          id_usuario: currentUserId,
          id_artista: Number(artistaId),
        });
      if (insertErr) {
        console.error("Error insertando en artista_seguido:", insertErr);
      } else {
        setFollowing(true);
      }
    } else {
      const { error: deleteErr } = await supabase
        .from("artista_seguido")
        .delete()
        .eq("id_usuario", currentUserId)
        .eq("id_artista", Number(artistaId));
      if (deleteErr) {
        console.error("Error borrando en artista_seguido:", deleteErr);
      } else {
        setFollowing(false);
      }
    }
  };

  // --------------------------------------------
  // 3) Función para reproducir canción
  // --------------------------------------------
  const handlePlaySong = (song) => {
    // Se asume que `reproducirCancion` recibe: (cancionSeleccionada, listaCompletaDeCanciones)
    reproducirCancion(song, songs);
  };

  // --------------------------------------------
  // 4) Abrir modal de opciones para una canción
  // --------------------------------------------
  const openSongOptions = (song) => {
    setSelectedSong(song);
    setOpenOptionsModal(true);
    setTimeout(() => setShowOptionsContent(true), 50);
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsContent(false);
    setTimeout(() => {
      setOpenOptionsModal(false);
      setSelectedSong(null);
    }, 300);
  };

  // (Opcional) Obtener playlists del usuario para “Guardar en playlist”
  const fetchUserPlaylists = async () => {
    if (!currentUserId) return;
    const { data, error } = await supabase
      .from("playlist")
      .select("id, nombre, imagen")
      .eq("id_usuario", currentUserId);
    if (error) {
      console.error("Error al cargar playlists del usuario:", error);
    } else {
      setPlaylistsUsuario(data || []);
    }
  };

  const añadirCancionAPlaylist = async (playlistId, songId) => {
    try {
      await supabase.from("canciones_playlist").insert({
        playlist_id: playlistId,
        cancion_id: songId,
      });
      setOpenSelectPlaylistModal(false);
    } catch (err) {
      console.error("Error añadiendo canción a playlist:", err);
    }
  };

  // --------------------------------------------
  // 5) Spinner mientras carga todo
  // --------------------------------------------
  if (loadingData) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#121212",
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  // --------------------------------------------
  // 6) Render principal
  // --------------------------------------------
  return (
    <>
      <NavbarMobile />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#121212",
          color: "white",
        }}
      >
        {/* =======================
           CABECERA: AVATAR + NOMBRE + BOTÓN SEGUIR
         ======================= */}
        <Box sx={{ position: "relative", width: "100%", height: 200 }}>
          {/* Fondo derivado del avatar (oscurecido) */}
          {artist?.avatar && (
            <Box
              component="img"
              src={artist.avatar}
              alt={`Avatar de ${artist.nombre}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.3)",
              }}
            />
          )}
          {/* Overlay semitransparente */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          {/* Avatar grande superpuesto */}
          {artist?.avatar && (
            <Box
              component="img"
              src={artist.avatar}
              alt={`Avatar de ${artist.nombre}`}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                position: "absolute",
                bottom: -50,
                left: 16,
                border: "3px solid #121212",
                objectFit: "cover",
                backgroundColor: "#121212",
              }}
            />
          )}
        </Box>

        {/* =======================
           CONTENIDO PRINCIPAL
         ======================= */}
        <Box sx={{ px: 2, pt: 8 }} mb={"53px"}>
          {/* Nombre del artista y botón “Seguir” */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              {artist.nombre}
            </Typography>

            {!loadingUserId && (
              <Button
                variant={following ? "contained" : "outlined"}
                onClick={toggleFollow}
                sx={{
                  textTransform: "none",
                  borderColor: "#b3b3b3",
                  color: following ? "black" : "white",
                  backgroundColor: following ? "#b3b3b3" : "transparent",
                  ml: 2,
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
            {(loadingUserId || loadingFollowState) && (
              <Box sx={{ ml: 2 }}>
                <CircularProgress size={24} sx={{ color: "white" }} />
              </Box>
            )}
          </Box>

          {/* -----------------------
             Sección “Canciones” (mini-versión)
           ----------------------- */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Canciones
          </Typography>
          <Grid container spacing={1}>
            {songs.map((song) => (
              <Grid item xs={12} key={song.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* 1) Icono de reproducir */}
                  <IconButton
                    onClick={() => handlePlaySong(song)}
                    sx={{
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <PlayArrowIcon />
                  </IconButton>

                  {/* 2) Carátula clicable para reproducir */}
                  <Box
                    component="img"
                    src={song.imagen}
                    alt={song.nombre}
                    onClick={() => handlePlaySong(song)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />

                  {/* 3) Título + artista (clicables para reproducir) */}
                  <Box
                    onClick={() => handlePlaySong(song)}
                    sx={{ flexGrow: 1, cursor: "pointer" }}
                  >
                    <Typography variant="body2">{song.nombre}</Typography>
                    <Typography variant="caption" color="rgba(255,255,255,0.7)">
                      {song.usuarios?.nombre || "Artista desconocido"}
                    </Typography>
                  </Box>

                  {/* 4) Icono “Más opciones” */}
                  <IconButton
                    onClick={() => openSongOptions(song)}
                    sx={{
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}

            {songs.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body2" color="rgba(255,255,255,0.6)">
                  Este artista no tiene canciones publicadas.
                </Typography>
              </Grid>
            )}
          </Grid>

          {/* -----------------------
             Sección “Playlists”
           ----------------------- */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Playlists
            </Typography>
            <Grid container spacing={1}>
              {playlists.map((pl) => (
                <Grid item xs={6} key={pl.id}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Box
                      component="img"
                      src={pl.imagen}
                      alt={pl.nombre}
                      onClick={() => navigate(`/playlist/${pl.id}`)}
                      sx={{
                        width: "100%",
                        height: 100,
                        borderRadius: 1,
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {pl.nombre}
                    </Typography>
                  </Box>
                </Grid>
              ))}

              {playlists.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="rgba(255,255,255,0.6)">
                    Este artista no tiene playlists asociadas.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <ReproductorMobile />
        <MenuAbajoMobile/>

        {/* ======================================
          MODAL: Opciones para la canción seleccionada
         ====================================== */}
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
                maxHeight: "90vh",
                overflowY: "auto",
                boxSizing: "border-box",
              }}
            >
              <Typography fontWeight="bold" fontSize={18} mb={2}>
                Opciones para "{selectedSong?.nombre}"
              </Typography>

              {/* Guardar en playlist */}
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
                <CheckCircleIcon sx={{ fontSize: 30 }} />
                <Box>
                  <Typography fontWeight="bold">Añadir a playlist</Typography>
                  <Typography fontSize={13} color="#b3b3b3">
                    Guarda esta canción en tu playlist
                  </Typography>
                </Box>
              </Box>

              {/* Compartir (ejemplo básico) */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                py={1}
                sx={{ cursor: "pointer" }}
                onClick={handleCloseOptionsModal}
              >
                <MoreHorizIcon sx={{ fontSize: 30 }} />
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

        {/* ======================================
          MODAL: Seleccionar playlist para guardar canción
         ====================================== */}
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
    </>
  );
};

export default ContenidoCantanteMobile;
