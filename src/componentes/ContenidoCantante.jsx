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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
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
            <Typography variant="subtitle1" color="#b3b3b3" sx={{ mt: 0.5 }}>
              {formatStreams(artista.oyentes)} oyentes mensuales
            </Typography>
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  textTransform: "none",
                  bgcolor: "#1db954",
                  "&:hover": { bgcolor: "#1ed760" },
                }}
                onClick={() => {
                  /* aquí va la lógica de reproducir, si la tienes */
                }}
              >
                Reproducir
              </Button>

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
                    <MoreHorizIcon />
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
    </Box>
  );
};

export default ContenidoCantante;
