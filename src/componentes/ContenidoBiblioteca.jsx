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
  Modal,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const ContenidoBiblioteca = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const validarSesion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/registro");
      }
    };
    validarSesion();
  }, []);

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

  useEffect(() => {
        const fetchUserRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from("usuarios")
                    .select("role")
                    .eq("email", user.email)
                    .single();
                if (!error && data) {
                    setUserRole(data.role);
                }
            }
        };
        fetchUserRole();
    }, []);

  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => setShowContent(true), 10); // inicia animación
  };

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => setOpen(false), 300); // espera animación de salida
  };

  const [openSongModal, setOpenSongModal] = useState(false);
  const handleOpenSongModal = () => setOpenSongModal(true);
  const handleCloseSongModal = () => setOpenSongModal(false);
  const [songData, setSongData] = useState({
    nombre: "",
    imagen: null,
    mp3: null,
  });

  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [playlistData, setPlaylistData] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
  });

  return (
    <Box
      sx={{
        width: 300,
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
            onClick={handleOpen}
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              bgcolor: "#ff4081",
              "&:hover": { bgcolor: "#ff6081" },
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
      <Modal open={open} onClose={handleClose} sx={{ zIndex: 1300 }}>
                <Slide direction="up" in={showContent} mountOnEnter unmountOnExit>
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
                        <Typography fontWeight="bold" fontSize={18} mb={2}>Crear nuevo</Typography>

                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            py={1}
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                handleClose();
                                setOpenPlaylistModal(true);
                            }}
                        >
                            <LibraryMusicIcon sx={{ fontSize: 30 }} />
                            <Box>
                                <Typography fontWeight="bold">Playlist</Typography>
                                <Typography fontSize={13} color="#b3b3b3">Crea una playlist personalizada</Typography>
                            </Box>
                        </Box>


                        {userRole === "artista" && (
                            <Box display="flex" alignItems="center" gap={2} py={1} sx={{ cursor: "pointer" }} onClick={handleOpenSongModal}>
                                <MusicNoteIcon sx={{ fontSize: 30 }} />
                                <Box>
                                    <Typography fontWeight="bold">Canción</Typography>
                                    <Typography fontSize={13} color="#b3b3b3">Sube una canción nueva a tu perfil</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Slide>
            </Modal>
            <Modal open={openSongModal} onClose={handleCloseSongModal}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "#121212",
                        color: "white",
                        p: 4,
                        borderRadius: "16px",
                        width: "90%",
                        maxWidth: "400px",
                        boxShadow: 24,
                    }}
                >
                    <Typography fontWeight="bold" fontSize={18} mb={2}>Subir Canción</Typography>

                    <Box mb={2}>
                        <Typography fontSize={14} mb={1}>Nombre de la canción</Typography>
                        <input
                            type="text"
                            value={songData.nombre}
                            onChange={(e) => setSongData({ ...songData, nombre: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#2a2a2a",
                                color: "white",
                            }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography fontSize={14} mb={1}>Imagen de portada</Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSongData({ ...songData, imagen: e.target.files[0] })}
                            style={{ color: "white" }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography fontSize={14} mb={1}>Archivo MP3</Typography>
                        <input
                            type="file"
                            accept="audio/mpeg"
                            onChange={(e) => setSongData({ ...songData, mp3: e.target.files[0] })}
                            style={{ color: "white" }}
                        />
                    </Box>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <button
                            onClick={handleCloseSongModal}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#333",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    const { nombre, imagen, mp3 } = songData;

                                    if (!nombre || !imagen || !mp3) {
                                        alert("Todos los campos son obligatorios.");
                                        return;
                                    }

                                    // 1. Obtener el usuario logueado
                                    const { data: { user }, error: userError } = await supabase.auth.getUser();
                                    if (userError || !user) throw new Error("No se pudo obtener el usuario.");

                                    // 2. Obtener el ID del usuario desde tu tabla 'usuarios'
                                    const { data: usuarioData, error: usuarioError } = await supabase
                                        .from("usuarios")
                                        .select("id")
                                        .eq("email", user.email)
                                        .single();

                                    if (usuarioError || !usuarioData) throw new Error("No se encontró el usuario en la base de datos.");

                                    const usuarioId = usuarioData.id;

                                    // 3. Insertar fila en 'canciones' sin imagen ni cancion
                                    const { data: insertData, error: insertError } = await supabase
                                        .from("canciones")
                                        .insert([
                                            {
                                                nombre,
                                                artista: usuarioId,
                                                imagen: "",
                                                cancion: "",
                                            }
                                        ])
                                        .select()
                                        .single();

                                    if (insertError) throw new Error("Error al crear la canción: " + insertError.message);

                                    const songId = insertData.id;
                                    const folder = `${nombre.replace(/\s+/g, '_')}_${songId}`;

                                    // 4. Subir la imagen
                                    const { data: imageUpload, error: imageError } = await supabase.storage
                                        .from("canciones")
                                        .upload(`${folder}/imagen.jpg`, imagen, {
                                            cacheControl: "3600",
                                            upsert: true,
                                        });

                                    if (imageError) throw new Error("Error al subir la imagen: " + imageError.message);

                                    // 5. Subir el MP3
                                    const { data: mp3Upload, error: mp3Error } = await supabase.storage
                                        .from("canciones")
                                        .upload(`${folder}/cancion.mp3`, mp3, {
                                            cacheControl: "3600",
                                            upsert: true,
                                        });

                                    if (mp3Error) throw new Error("Error al subir el MP3: " + mp3Error.message);

                                    // 6. Obtener URLs públicas
                                    const imageUrl = supabase.storage.from("canciones").getPublicUrl(`${folder}/imagen.jpg`).data.publicUrl;
                                    const mp3Url = supabase.storage.from("canciones").getPublicUrl(`${folder}/cancion.mp3`).data.publicUrl;

                                    // 7. Actualizar fila
                                    const { error: updateError } = await supabase
                                        .from("canciones")
                                        .update({
                                            imagen: imageUrl,
                                            cancion: mp3Url,
                                        })
                                        .eq("id", songId);

                                    if (updateError) throw new Error("Error al actualizar la canción: " + updateError.message);

                                    alert("¡Canción subida con éxito!");
                                    setSongData({ nombre: "", imagen: null, mp3: null });
                                    handleCloseSongModal();

                                } catch (err) {
                                    console.error(err);
                                    alert("Hubo un error: " + err.message);
                                }
                            }}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#ff4081",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                            }}
                        >
                            Subir
                        </button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={openPlaylistModal} onClose={() => setOpenPlaylistModal(false)}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "#121212",
                        color: "white",
                        p: 4,
                        borderRadius: "16px",
                        width: "90%",
                        maxWidth: "400px",
                        boxShadow: 24,
                    }}
                >
                    <Typography fontWeight="bold" fontSize={18} mb={2}>Crear Playlist</Typography>

                    <Box mb={2}>
                        <Typography fontSize={14} mb={1}>Nombre</Typography>
                        <input
                            type="text"
                            value={playlistData.nombre}
                            onChange={(e) => setPlaylistData({ ...playlistData, nombre: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#2a2a2a",
                                color: "white",
                            }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography fontSize={14} mb={1}>Descripción</Typography>
                        <textarea
                            value={playlistData.descripcion}
                            onChange={(e) => setPlaylistData({ ...playlistData, descripcion: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#2a2a2a",
                                color: "white",
                                height: "80px",
                                resize: "none",
                            }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography fontSize={14} mb={1}>Imagen de portada (opcional)</Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPlaylistData({ ...playlistData, imagen: e.target.files[0] })}
                            style={{ color: "white" }}
                        />
                    </Box>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <button
                            onClick={() => setOpenPlaylistModal(false)}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#333",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    const { nombre, descripcion, imagen } = playlistData;

                                    if (!nombre.trim()) {
                                        alert("El nombre es obligatorio.");
                                        return;
                                    }

                                    const { data: { user } } = await supabase.auth.getUser();
                                    const { data: usuarioData, error: usuarioError } = await supabase
                                        .from("usuarios")
                                        .select("id")
                                        .eq("email", user.email)
                                        .single();

                                    if (usuarioError || !usuarioData) throw new Error("No se encontró el usuario.");

                                    const usuarioId = usuarioData.id;

                                    // Crear playlist sin imagen aún
                                    const playlistPayload = {
                                        nombre,
                                        descripcion,
                                            id_usuario: usuarioId,
                                    };

                                    const { data: nuevaPlaylist, error: insertError } = await supabase
                                        .from("playlist")
                                        .insert(playlistPayload)
                                        .select()
                                        .single();


                                    if (insertError) throw insertError;

                                    let imageUrl = "";

                                    // Si hay imagen, subirla
                                    if (imagen) {
                                        const folder = `playlist_${nuevaPlaylist.id}`;
                                        const { data: imgUpload, error: imgError } = await supabase.storage
                                            .from("playlist")
                                            .upload(`${folder}/portada.jpg`, imagen, {
                                                cacheControl: "3600",
                                                upsert: true,
                                            });

                                        if (imgError) throw imgError;

                                        imageUrl = supabase.storage
                                            .from("playlist")
                                            .getPublicUrl(`${folder}/portada.jpg`).data.publicUrl;

                                        // Actualizar imagen en playlist
                                        await supabase
                                            .from("playlist")
                                            .update({ imagen: imageUrl })
                                            .eq("id", nuevaPlaylist.id);
                                    }

                                    alert("¡Playlist creada con éxito!");
                                    setPlaylistData({ nombre: "", descripcion: "", imagen: null });
                                    setOpenPlaylistModal(false);
                                } catch (err) {
                                    console.error(err);
                                    alert("Error al crear playlist: " + err.message);
                                }
                            }}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#ff4081",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                            }}
                        >
                            Crear
                        </button>
                    </Box>
                </Box>
            </Modal>
    </Box>
  );
};

export default ContenidoBiblioteca;
