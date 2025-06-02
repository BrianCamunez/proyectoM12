import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import NavbarMobile from "./NavbarMobile";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ContenidoBibliotecaListaMobile from "./ContenidoBibliotecaListaMobile";
import ContenidoBibliotecaGridMobile from "./ContenidoBibliotecaGridMobile";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";
import { supabase } from "../../supabase/supabase";

const ContenidoBibliotecaMobile = () => {
  const [tipoVision, setTipoVision] = useState("lista");
  const [playlists, setPlaylists] = useState([]);

  const cambiarVista = () => {
    setTipoVision((prev) => (prev === "lista" ? "grid" : "lista"));
  };

  useEffect(() => {
    const cargarPlaylists = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data: usuario, error: usuarioError } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", user.email)
        .single();

      if (usuarioError || !usuario) return;

      const { data: playlistsData, error: playlistError } = await supabase
        .from("playlist")
        .select("id, nombre, imagen, usuarios (nombre)")
        .eq("id_usuario", usuario.id);

      if (!playlistError) {
        setPlaylists(playlistsData);
      } else {
        console.error("Error cargando playlists:", playlistError);
      }
    };

    cargarPlaylists();
  }, []);

  return (
    <>
      <NavbarMobile />
      <Box px={2}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"}>
            <SwapVertIcon sx={{ color: "white" }} />
            <Box>Recientes</Box>
          </Box>
          <Box>
            {tipoVision === "lista" ? (
              <GridViewIcon sx={{ color: "white", cursor: "pointer" }} onClick={cambiarVista} />
            ) : (
              <FormatListBulletedIcon sx={{ color: "white", cursor: "pointer" }} onClick={cambiarVista} />
            )}
          </Box>
        </Box>

        <Box>
          {tipoVision === "lista" ? (
            <ContenidoBibliotecaListaMobile playlists={playlists} />
          ) : (
            <ContenidoBibliotecaGridMobile playlists={playlists} />
          )}
        </Box>
      </Box>
      <ReproductorMobile />
      <MenuAbajoMobile />
    </>
  );
};

export default ContenidoBibliotecaMobile;
