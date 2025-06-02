// src/App.jsx
import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme, Slide } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";

import PaginaHome from "./componentes/PaginaHome";
import Contenido from "./componentes/Contenido";
import ContenidoHome from "./componentes/ContenidoHome";
import ContenidoPlaylist from "./componentes/ContenidoPlaylist";
import ContenidoCancion from "./componentes/ContenidoCancion";
import PaginaExplorar from "./componentes/PaginaExplorar";
import ContenidoMobile from "./componentes/ContenidoMobile";

import RegistroComponente from "./componentes/RegistroComponente";
import InicioSesion from "./componentes/InicioSesion";

import ContenidoCancionMobile from "./componentes/componentesMobile/ContenidoCancionMobile";
import ContenidoPlaylistMobile from "./componentes/componentesMobile/ContenidoPlaylistMobile";
import ContenidoCantanteMobile from "./componentes/componentesMobile/ContenidoCantanteMobile";
import ContenidoBibliotecaMobile from "./componentes/componentesMobile/ContenidoBibliotecaMobile";
import ContenidoExplorarMobile from "./componentes/componentesMobile/ContenidoExplorarMobile";
import ContenidoPerfilMobile from "./componentes/componentesMobile/ContenidoPerfilMobile";
import ContenidoGeneroMobile from "./componentes/componentesMobile/ContenidoGeneroMobile";

function App() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "black",
        color: "white",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Routes location={location}>
        {/* Rutas públicas */}
        <Route path="/registro" element={<RegistroComponente />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />

        {/* Ruta principal "/" */}
        <Route
          path="/"
          element={
            <Slide direction="right" in mountOnEnter timeout={300}>
              <Box width="100%" height="100%">
                <PaginaHome />
              </Box>
            </Slide>
          }
        >
          {isMdUp ? (
            <>
              {/* Layout de escritorio con sidebars */}
              <Route element={<Contenido />}>
                <Route index element={<ContenidoHome />} />
                <Route path="playlist/:id" element={<ContenidoPlaylist />} />
                <Route path="cancion" element={<ContenidoCancion />} />
                <Route path="contenido2" element={<PaginaExplorar />} />
              </Route>
            </>
          ) : (
            <>
              {/* Rutas solo móvil (sin sidebars) */}
              <Route index element={<ContenidoMobile />} />
              <Route path="playlistMobile/:id" element={<ContenidoPlaylistMobile />} />
              <Route path="cancion" element={<ContenidoCancionMobile />} />
              <Route path="cantanteMobile" element={<ContenidoCantanteMobile />} />
              <Route path="biblioteca" element={<ContenidoBibliotecaMobile />} />
              <Route path="explorarMobile" element={<ContenidoExplorarMobile />} />
              <Route path="perfilMobile" element={<ContenidoPerfilMobile />} />
              <Route path="genero/:nombre" element={<ContenidoGeneroMobile />} />
            </>
          )}
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
