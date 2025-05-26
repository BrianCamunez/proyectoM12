import { Box, Modal, Typography, Slide } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GroupIcon from '@mui/icons-material/Group';
import MergeIcon from '@mui/icons-material/Merge';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from '../../supabase/supabase';

const MenuAbajoMobile = () => {
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

    const [openSongModal, setOpenSongModal] = useState(false);
    const handleOpenSongModal = () => setOpenSongModal(true);
    const handleCloseSongModal = () => setOpenSongModal(false);
    const [songData, setSongData] = useState({
        nombre: "",
        imagen: null,
        mp3: null,
    });

    return (
        <>
            <Box display="flex" width="100%" justifyContent="space-around" bottom={0} position="absolute" paddingY={1} sx={{ backgroundColor: "black", opacity: 0.97 }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Box display="flex" flexDirection="column" alignItems="center" color="white">
                        <HomeIcon />
                        <Box>Inicio</Box>
                    </Box>
                </Link>
                <Link to="/explorarMobile" style={{ textDecoration: "none" }}>
                    <Box display="flex" flexDirection="column" alignItems="center" color="white">
                        <SearchIcon />
                        <Box>Buscar</Box>
                    </Box>
                </Link>
                <Link to="/biblioteca" style={{ textDecoration: "none" }}>
                    <Box display="flex" flexDirection="column" alignItems="center" color="white">
                        <BookmarkIcon />
                        <Box>Tu Biblioteca</Box>
                    </Box>
                </Link>
                <Box onClick={handleOpen} sx={{ cursor: "pointer" }} display="flex" flexDirection="column" alignItems="center" color="white">
                    <AddIcon />
                    <Box>Crear</Box>
                </Box>
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

                        <Box display="flex" alignItems="center" gap={2} py={1}>
                            <LibraryMusicIcon sx={{ fontSize: 30 }} />
                            <Box>
                                <Typography fontWeight="bold">Lista</Typography>
                                <Typography fontSize={13} color="#b3b3b3">Crea una lista con canciones o episodios</Typography>
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
                                backgroundColor: "#1DB954",
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
        </>
    );
};

export default MenuAbajoMobile;
