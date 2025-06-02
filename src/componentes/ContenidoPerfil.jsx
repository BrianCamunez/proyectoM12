// src/componentes/ContenidoPerfil.jsx
import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
} from "@mui/material";
import { supabase } from "../supabase/supabase";
import { Link } from "react-router-dom";

const ContenidoPerfil = () => {
    const [userName, setUserName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emailUsuario, setEmailUsuario] = useState("");

    useEffect(() => {
        const fetchPerfil = async () => {
            // 1) Obtener user de Auth
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;

            setEmailUsuario(user.email);

            // 2) Obtener datos de usuario desde la tabla "usuarios"
            const {
                data: usuario,
                error: usuarioError,
            } = await supabase
                .from("usuarios")
                .select("id, nombre, avatar")
                .eq("email", user.email)
                .single();
            if (usuarioError) {
                console.error("Error al obtener datos del usuario:", usuarioError);
                setLoading(false);
                return;
            }

            setUserName(usuario.nombre);
            setAvatarUrl(usuario.avatar);

            // 3) Obtener hasta 10 playlists del usuario
            const {
                data: playlistsData,
                error: playlistsError,
            } = await supabase
                .from("playlist")
                .select("id, nombre, imagen")
                .eq("id_usuario", usuario.id)
                .limit(10);
            if (playlistsError) {
                console.error("Error al obtener playlists del usuario:", playlistsError);
            } else {
                setPlaylists(playlistsData || []);
            }

            setLoading(false);
        };

        fetchPerfil();
    }, []);

    const mirarImagenClick = () => {
        document.getElementById("imagenInput").click();
    };

    const mirarCambiarImagen = async (event) => {
        const file = event.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            alert("Por favor selecciona una imagen válida");
            return;
        }

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `avatar.${fileExt}`;
            const filePath = `${userName}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('users')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('users')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('usuarios')
                .update({ avatar: publicUrl })
                .eq('email', emailUsuario);

            if (updateError) throw updateError;

            setAvatarUrl(publicUrl);
            console.log("Imagen actualizada correctamente");
        } catch (error) {
            console.error("Error al subir la imagen:", error.message);
            alert("Hubo un problema al subir la imagen");
        }
    };


    if (loading) {
        return (
            <Box
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 2,
                    backgroundColor: "#121212",
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <>
            {/* Contenedor principal */}
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: "#121212",
                    borderRadius: 2,
                    // El scroll lo maneja el padre, por eso aquí no ponemos overflowY
                }}
            >
                {/*** Encabezado de perfil ***/}
                <Box
                    sx={{
                        position: "relative",
                        background: "linear-gradient(to bottom, #333333, #121212)",
                        p: 4,
                        display: "flex",
                        alignItems: "center",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                >
                    {/* Avatar / imagen de perfil */}
                    <Box
                        component="img"
                        src={avatarUrl || ""}
                        alt={userName}
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                        onClick={mirarImagenClick}
                    />
                    <input
                        type="file"
                        id="imagenInput"
                        hidden
                        accept="image/*"
                        onChange={mirarCambiarImagen}
                    />

                    {/* Texto al lado de la imagen */}
                    <Box sx={{ ml: 3 }}>
                        <Typography variant="subtitle2" color="#b3b3b3">
                            Perfil
                        </Typography>
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            color="white"
                            sx={{ lineHeight: 1.1, mt: 0.5 }}
                        >
                            {userName}
                        </Typography>
                        <Typography variant="body2" color="#b3b3b3" sx={{ mt: 1 }}>
                            {playlists.length}{" "}
                            {playlists.length === 1 ? "lista pública" : "listas públicas"}
                        </Typography>
                    </Box>
                </Box>

                {/*** Sección: Mis playlists ***/}
                <Box sx={{ px: 4, py: 3 }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography variant="h6" color="white">
                            Mis playlists
                        </Typography>
                        <Typography variant="body2" color="#b3b3b3">
                            Ver todas
                        </Typography>
                    </Box>

                    {playlists.length === 0 ? (
                        <Typography color="#b3b3b3">No tienes playlists creadas.</Typography>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                gap: 2,
                            }}
                        >
                            {playlists.map((pl) => (
                                <Link
                                    key={pl.id}
                                    to={`/playlist/${pl.id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: "#1e1e1e",
                                            borderRadius: 2,
                                            boxShadow: "none",
                                            cursor: "pointer",
                                            height: 200,
                                            display: "flex",
                                            flexDirection: "column",
                                            "&:hover": { transform: "scale(1.02)", transition: "0.2s" },
                                        }}
                                    >
                                        {pl.imagen ? (
                                            <CardMedia
                                                component="img"
                                                image={pl.imagen}
                                                alt={pl.nombre}
                                                sx={{
                                                    width: "100%",
                                                    height: 120,
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: 120,
                                                    backgroundColor: "#2e2e2e",
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography color="#555555">Sin imagen</Typography>
                                            </Box>
                                        )}
                                        <CardContent sx={{ p: 1, textAlign: "center", flexGrow: 1 }}>
                                            <Typography
                                                variant="body2"
                                                color="white"
                                                fontWeight="bold"
                                                noWrap
                                            >
                                                {pl.nombre}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </>

    );
};

export default ContenidoPerfil;
