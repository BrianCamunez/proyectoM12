import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

const PlaylistPreferidasMobile = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPlaylists = async () => {
      // Paso 1: obtener usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("No se pudo obtener el usuario autenticado");
        return;
      }

      // Paso 2: obtener id real desde la tabla 'usuarios' usando el email
      const { data: usuario, error: usuarioError } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", user.email) // ✅ comparando por email
        .single();

      if (usuarioError || !usuario) {
        console.error("No se pudo encontrar el usuario en la tabla 'usuarios'");
        return;
      }

      // Paso 3: obtener playlists de ese usuario
      const { data: playlistsData, error: playlistError } = await supabase
        .from("playlist")
        .select("id, nombre, imagen")
        .eq("id_usuario", usuario.id)
        .limit(8);

      if (!playlistError) {
        setPlaylists(playlistsData);
      } else {
        console.error("Error al cargar playlists:", playlistError);
      }
    };

    cargarPlaylists();
  }, []);

  const redirigir = (id) => {
    navigate(`/playlistMobile/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
      <Grid container width="100%" px={2} spacing={1}>
        {playlists.map((playlist) => (
          <Grid item xs={6} key={playlist.id}>
            <Button
              onClick={() => redirigir(playlist.id)}
              sx={{
                textTransform: "none",
                backgroundColor: "#3a3a3a",
                p: 0,
                width: "100%",
              }}
            >
              <Box display="flex" sx={{ height: "40px", width: "100%" }}>
                <Box>
                  <Box
                    component="img"
                    src={playlist.imagen}
                    width="40px"
                    height="40px"
                    borderRadius={2}
                  />
                </Box>
                <Box
                  mx={2}
                  display="flex"
                  alignItems="center"
                  sx={{ fontSize: "12px", color: "white" }}
                >
                  {playlist.nombre}
                </Box>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlaylistPreferidasMobile;
