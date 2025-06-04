// src/componentes/ContenidoHome.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const ContenidoHome = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        // 1) Obtener hasta 5 playlists aleatorias
        const { data: playlistsData, error: playlistsError } = await supabase
          .from("playlist")
          .select("id, nombre, imagen")
          //.order("random()", { ascending: true }) // muestra en orden aleatorio si PostgREST lo permite
          .limit(5);
        if (playlistsError) throw playlistsError;
        setPlaylists(playlistsData || []);

        // 2) Obtener todos los usuarios con role = "artista"
        const { data: artistasData, error: artistasError } = await supabase
          .from("usuarios")
          .select("id, nombre, avatar")
          .eq("role", "artista")
          .limit(6);
        if (artistasError) throw artistasError;
        setArtistas(artistasData || []);
      } catch (err) {
        console.error("Error cargando datos de Home:", err.message);
        setPlaylists([]);
        setArtistas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <Box
      sx={{
        flexGrow: 1,
        px: 2,
        py: 2,
        backgroundColor: "#121212",
        borderRadius: 2,
        overflowY: "auto",
        height: "100%",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#2e2e2e",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#555555",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#777777",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#555555 #2e2e2e",
      }}
    >
      {/* === Sección: Playlists aleatorias === */}
      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6" color="white">
            Playlists aleatorias
          </Typography>
          <Typography variant="body2" color="#b3b3b3">
            Ver todas
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 2,
          }}
        >
          {playlists.length === 0 && (
            <Typography color="#b3b3b3">No hay playlists disponibles.</Typography>
          )}
          {playlists.map((pl) => (
            <Link
              to={`/playlist/${pl.id}`}
              key={pl.id}
              style={{ textDecoration: "none" }}
            >
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
                    <LibraryMusicIcon sx={{ color: "#555", fontSize: 40 }} />
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
      </Box>

      {/* === Sección: Artistas disponibles === */}
      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6" color="white">
            Artistas
          </Typography>
          <Typography variant="body2" color="#b3b3b3">
            Ver todos
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 2,
          }}
        >
          {artistas.length === 0 && (
            <Typography color="#b3b3b3">No hay artistas registrados.</Typography>
          )}
          {artistas.map((art) => (
            <Link
              to={`/cantante/${art.id}`}
              key={art.id}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.02)", transition: "0.2s" },
                }}
              >
                <Avatar
                  src={art.avatar || ""}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: art.avatar ? "transparent" : "#333333",
                    fontSize: 24,
                    mb: 1,
                  }}
                >
                  {!art.avatar && art.nombre.slice(0, 1).toUpperCase()}
                </Avatar>
                <Typography variant="body2" color="white" noWrap>
                  {art.nombre}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ContenidoHome;
