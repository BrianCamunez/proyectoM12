import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Modal, Slide } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from "../../supabase/supabase";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";
import IosShareIcon from '@mui/icons-material/IosShare';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const ContenidoGeneroMobile = () => {
    const { nombre } = useParams(); // 👈 nombre del género desde la URL
    const navigate = useNavigate();
    const [canciones, setCanciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openOptionsModal, setOpenOptionsModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
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




    const handleBackClick = () => navigate(-1);

    useEffect(() => {
        const fetchCanciones = async () => {
            const { data, error } = await supabase
                .from("canciones")
                .select("id, nombre, imagen, usuarios(nombre)")
                .eq("genero", decodeURIComponent(nombre));


            if (error) {
                console.error("Error al obtener canciones:", error);
            } else {
                setCanciones(data);
            }

            setLoading(false);
        };

        fetchCanciones();
    }, [nombre]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" color="white">
                Cargando...
            </Box>
        );
    }

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


    return (
        <>
            <Box display={"flex"} flexDirection={"column"}>
                <Box>
                    <ArrowBackIosIcon onClick={handleBackClick} sx={{ padding: 2, fontSize: "25px", color: "white", position: "absolute", marginLeft: 1, marginTop: 1 }} />
                    <Box pt={3} mx={2}>
                        <Box justifyContent={"center"} alignContent={"center"} display={"flex"}>
                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"300px"} height={"300px"} />
                        </Box>
                        <Box py={2}>
                            <Typography fontWeight="bold">{nombre}</Typography>
                            <Box>Género musical seleccionado <InfoIcon /></Box>
                        </Box>
                        <Box>{canciones.length} canciones encontradas</Box>
                        <Box py={2} display={"flex"} justifyContent={"space-between"}>
                            <Box display={"flex"} gap={2}>
                                <AddCircleOutlineIcon />
                                <ArrowCircleDownIcon />
                                <MoreHorizIcon />
                            </Box>
                            <Box>
                                <ShuffleIcon sx={{ paddingRight: 2 }} />
                                <PlayCircleIcon />
                            </Box>
                        </Box>

                        <Box>
                            {canciones.map((cancion) => (
                                <Box key={cancion.id} display={"flex"} py={1} justifyContent={"space-between"} alignItems={"center"}>
                                    <Box display={"flex"} alignItems={"center"}>
                                        <Box component="img" src={cancion.imagen} width={"40px"} height={"40px"} borderRadius={2} />
                                        <Box ml={1}>
                                            <Typography>{cancion.nombre}</Typography>
                                            <Typography variant="body2" color="#b3b3b3">
                                                {cancion.usuarios?.nombre || "Artista desconocido"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CheckCircleIcon sx={{ paddingRight: 2, fontSize: "16px" }} />
                                        <MoreHorizIcon
                                            sx={{ fontSize: '16px', cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedSong(cancion); // guarda la canción actual
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
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Grid item xs={4} key={index}>
                                        <Button sx={{ textTransform: "none", padding: 0, width: "100%" }}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100%"} height={"auto"} />
                                        </Button>
                                        <Box my={1}>Playlist sugerida</Box>
                                        <Box>Descripción corta</Box>
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

export default ContenidoGeneroMobile;
