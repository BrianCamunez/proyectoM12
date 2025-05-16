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

function App() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const location = useLocation();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <Box sx={{ minHeight: "100vh", minWidth: "100vw", backgroundColor: "black", color: "white", overflow: "hidden" }}>
      <Routes location={location}>
        <Route path="/registro" element={<RegistroComponente />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route
          path="/"
          element={
            <Slide direction="right" in={true} mountOnEnter  timeout={300}>
              <div style={{ width: "100%", height: "100%" }}>
                {isMdUp ? <PaginaHome /> : <ContenidoMobile />}
              </div>
             </Slide>
          }
        />
        <Route
          path="/contenido2"
          element={
            <Slide direction="right" in={isMounted} mountOnEnter unmountOnExit timeout={300}>
              <div style={{ width: "100%", height: "100%" }}>
                {isMdUp ? <PaginaExplorar /> : <ContenidoMobile />}
              </div>
            </Slide>
          }
        />
        <Route
          path="/playlist"
          element={
            <>
              <Navbar />
              <Box sx={{ display: "flex", pt: "64px", height: "calc(100vh - 64px)", overflow: "hidden" }}>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: isMdUp ? "flex-start" : "center" }}>
                  <ContenidoPlaylist />
                </Box>
              </Box>
              <Player />
            </>
          }
        />
        <Route
          path="/cancion"
          element={
            <>
              {isMdUp ? <ContenidoCancion /> : <ContenidoCancionMobile />}
            </>
          }
        />
        <Route
          path="/playlistMobile"
          element={
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={600}>
              <div style={{ width: "100%", height: "100%" }}>
                <ContenidoPlaylistMobile />
              </div>
            </Slide>
          }
        />
        <Route path="/cantanteMobile" element={<ContenidoCantanteMobile />} />
        {/* <Route path="/biblioteca" element={<ContenidoBibliotecaMobile />} /> */}
        <Route
          path="/biblioteca"
          element={
            <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={600}>
              <div style={{ width: "100%", height: "100%" }}>
              <ContenidoBibliotecaMobile />
              </div>
            </Slide>
          }
        />
         <Route path="/explorarMobile" element={<ContenidoExplorarMobile />} />
         <Route path="/perfilMobile" element={<ContenidoPerfilMobile />} />
      </Routes>
    </Box>
  );
}

export default App;
