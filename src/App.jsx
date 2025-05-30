import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme, Slide } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Player from "./componentes/Player";
import PaginaHome from "./componentes/PaginaHome";
import RegistroComponente from "./componentes/RegistroComponente";
import InicioSesion from "./componentes/InicioSesion";
import ContenidoPlaylist from "./componentes/ContenidoPlaylist";
import ContenidoCancion from "./componentes/ContenidoCancion";
import ContenidoMobile from "./componentes/ContenidoMobile";
import PaginaExplorar from "./componentes/PaginaExplorar";
import ContenidoCancionMobile from "./componentes/componentesMobile/ContenidoCancionMobile";
import ContenidoPlaylistMobile from "./componentes/componentesMobile/ContenidoPlaylistMobile";
import ContenidoCantanteMobile from "./componentes/componentesMobile/ContenidoCantanteMobile";
import ContenidoBibliotecaMobile from "./componentes/componentesMobile/ContenidoBibliotecaMobile";
import ContenidoExplorarMobile from "./componentes/componentesMobile/ContenidoExplorarMobile";
import ContenidoPerfilMobile from "./componentes/componentesMobile/ContenidoPerfilMobile";
import ContenidoGeneroMobile from "./componentes/componentesMobile/ContenidoGeneroMobile";
import LayoutConNavbarYPlayer from "./componentes/LayoutConNavbarYPlayer";

function App() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", minWidth: "100vw", backgroundColor: "black", color: "white", overflow: "hidden", boxSizing: "border-box", }}>
      <Routes location={location}>

        {/* Rutas públicas */}
        <Route path="/registro" element={<RegistroComponente />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />

        {/* Ruta home */}
        <Route
          path="/"
          element={
            <Slide direction="right" in mountOnEnter timeout={300}>
              <Box width="100%" height="100%">
                {isMdUp ? <PaginaHome /> : <ContenidoMobile />}
              </Box>
            </Slide>
          }
        />

        {/* Ruta explorar */}
        <Route
          path="/contenido2"
          element={
            <Slide direction="right" in={isMounted} mountOnEnter unmountOnExit timeout={300}>
              <Box width="100%" height="100%">
                {isMdUp ? <PaginaExplorar /> : <ContenidoMobile />}
              </Box>
            </Slide>
          }
        />

        {/* Desktop solo si md+ */}
        {isMdUp && (
          <>
            <Route
              path="/playlist"
              element={
                <LayoutConNavbarYPlayer>
                  <ContenidoPlaylist />
                </LayoutConNavbarYPlayer>
              }
            />
            <Route path="/cancion" element={<ContenidoCancion />} />
          </>
        )}

        {/* Mobile-only */}
        {!isMdUp && (
          <>
            <Route path="/cancion" element={<ContenidoCancionMobile />} />
            <Route path="/playlistMobile/:id" element={<ContenidoPlaylistMobile />} />
            <Route path="/cantanteMobile" element={<ContenidoCantanteMobile />} />
            <Route path="/biblioteca" element={<ContenidoBibliotecaMobile />} />
            <Route path="/explorarMobile" element={<ContenidoExplorarMobile />} />
            <Route path="/perfilMobile" element={<ContenidoPerfilMobile />} />
            <Route path="/genero/:nombre" element={<ContenidoGeneroMobile />} />
          </>
        )}
      </Routes>
    </Box>
  );
}


export default App;
