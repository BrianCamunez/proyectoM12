import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Modal, Slide } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";
import { usePlayer } from "../../context/PlayerContext";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import IosShareIcon from '@mui/icons-material/IosShare';

const ContenidoPlaylistMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canciones, setCanciones] = useState([]);

  const [selectedSong, setSelectedSong] = useState(null);
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [showOptionsContent, setShowOptionsContent] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    const validarSesion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/registro");
      }
    };
    validarSesion();
  }, []);

  const handleCloseOptionsModal = () => {
    setShowOptionsContent(false);
    setTimeout(() => {
      setOpenOptionsModal(false);
      setSelectedSong(null);
    }, 300); // tiempo para permitir que Slide se cierre con animación
  };

  // Modal para seleccionar playlist
  const [openSelectPlaylistModal, setOpenSelectPlaylistModal] = useState(false);
  const [playlistsUsuario, setPlaylistsUsuario] = useState([]);

  const { reproducirCancion } = usePlayer();

  const handleBackClick = () => navigate(-1);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data, error } = await supabase
        .from("playlist")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al cargar la playlist:", error);
      } else {
        setPlaylist(data);
      }

      setLoading(false);
    };

    fetchPlaylist();

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

    fetchCanciones();
  }, [id]);

  const [sugeridas, setSugeridas] = useState([]);

  useEffect(() => {
    const fetchSugeridas = async () => {
      if (!playlist?.id_usuario) return;

      const { data, error } = await supabase
        .from("playlist")
        .select("*")
        .eq("id_usuario", playlist.id_usuario)
        .neq("id", playlist.id)
        .limit(6);

      if (!error) {
        // Mezclar aleatoriamente
        const mezcladas = data.sort(() => 0.5 - Math.random());
        setSugeridas(mezcladas);
      } else {
        console.error("Error al obtener playlists sugeridas:", error);
      }
    };

    if (playlist?.id_usuario) {
      fetchSugeridas();
    }
  }, [playlist]);


  if (loading || !playlist) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        color="white"
      >
        Cargando...
      </Box>
    );
  }

  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Box>
          <ArrowBackIosIcon
            onClick={handleBackClick}
            sx={{
              padding: 2,
              fontSize: "25px",
              color: "white",
              position: "absolute",
              marginLeft: 1,
              marginTop: 1,
            }}
          />
          <Box pt={3} mx={2}>
            <Box
              justifyContent={"center"}
              alignContent={"center"}
              display={"flex"}
            >
              <Box
                component="img"
                src={playlist.imagen}
                width={"300px"}
                height={"300px"}
              />
            </Box>
            <Box py={2}>
              <Typography fontWeight="bold">{playlist.nombre}</Typography>
              <Box py={2}>
                {playlist.descripcion || "Sin descripción"}
              </Box>
            </Box>
            <Box py={2} display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={2}>
                <AddCircleOutlineIcon />
                <ArrowCircleDownIcon />
                <MoreHorizIcon/>
              </Box>
              <Box>
                <ShuffleIcon sx={{ paddingRight: 2 }} />
                <PlayCircleIcon />
              </Box>
            </Box>

            <Box>
              {canciones.map((cancion) => (
                <Box
                  key={cancion.id}
                  display={"flex"}
                  py={1}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box display={"flex"} alignItems={"center"}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      reproducirCancion(
                        {
                          id: cancion.id,
                          nombre: cancion.nombre,
                          imagen: cancion.imagen,
                          cancion: cancion.cancion,
                          artista:
                            cancion.usuarios?.nombre || "Artista desconocido",
                        },
                        canciones.map((c) => ({
                          id: c.id,
                          nombre: c.nombre,
                          imagen: c.imagen,
                          cancion: c.cancion,
                          artista: c.usuarios?.nombre || "Artista desconocido",
                        }))
                      )
                    }
                  >
                    <Box
                      component="img"
                      src={cancion.imagen}
                      width={"40px"}
                      height={"40px"}
                      borderRadius={2}
                    />
                    <Box ml={1}>
                      <Typography>{cancion.nombre}</Typography>
                      <Typography variant="body2" color="#b3b3b3">
                        {cancion.usuarios?.nombre || "Artista desconocido"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <CheckCircleIcon
                      sx={{ paddingRight: 2, fontSize: "16px" }}
                    />
                    <MoreHorizIcon
                      sx={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedSong(cancion);
                        setOpenOptionsModal(true);
                        setTimeout(() => setShowOptionsContent(true), 10);
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            <Box py={2}>También puede que te gusten</Box>
            <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
              <Grid container width={"100%"} paddingX={2} spacing={2}>
                {sugeridas.map((pl) => (
                  <Grid item xs={4} key={pl.id}>
                    <Button
                      onClick={() => navigate(`/playlistMobile/${pl.id}`)}
                      sx={{ textTransform: "none", padding: 0, width: "100%" }}
                    >
                      <Box
                        component="img"
                        src={pl.imagen}
                        width={"100%"}
                        height={"100px"}
                        sx={{ objectFit: "cover", borderRadius: 2 }}
                      />
                    </Button>
                    <Box mt={1} fontSize="14px" fontWeight="bold" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {pl.nombre}
                    </Box>
                    <Box fontSize="12px" color="#b3b3b3">
                      {pl.descripcion || "Sin descripción"}
                    </Box>
                  </Grid>
                ))}

              </Grid>
            </Box>
          </Box>
        </Box>
        <ReproductorMobile />
        <MenuAbajoMobile />
      </Box>
      <Modal open={openOptionsModal} onClose={() => {
        setShowOptionsContent(false);
        setTimeout(() => {
          setOpenOptionsModal(false);
          setSelectedSong(null);
        }, 300);
      }} sx={{ zIndex: 1300 }}>
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
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box"
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
                setSelectedSongId(selectedSong.id); // 💾 guardar solo el ID
                await fetchUserPlaylists();
                setOpenSelectPlaylistModal(true);
                handleCloseOptionsModal(); // esto sí puede limpiar selectedSong ahora
              }}


            >
              <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
              <Box>
                <Typography fontWeight="bold">Guardar en playlist</Typography>
                <Typography fontSize={13} color="#b3b3b3">Añade esta canción a una playlist</Typography>
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
                <Typography fontWeight="bold">Añadir a tu biblioteca</Typography>
                <Typography fontSize={13} color="#b3b3b3">Guarda esta canción en tu perfil</Typography>
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
                <Typography fontSize={13} color="#b3b3b3">Se reproducirá después</Typography>
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
                <Typography fontSize={13} color="#b3b3b3">Envía esta canción a tus amigos</Typography>
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
    </>
  );
};

export default ContenidoPlaylistMobile;
