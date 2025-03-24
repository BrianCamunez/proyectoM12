import { Box, useMediaQuery, useTheme } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./componentes/Navbar"
import Player from "./componentes/Player"
import PaginaHome from "./componentes/PaginaHome"
import RegistroComponente from "./componentes/RegistroComponente"
import InicioSesion from "./componentes/InicioSesion"
import ContenidoPlaylist from "./componentes/ContenidoPlaylist"
import ContenidoCancion from "./componentes/ContenidoCancion"
import ContenidoMobile from "./componentes/ContenidoMobile"
import PaginaExplorar from "./componentes/PaginaExplorar"
import ContenidoCancionMobile from "./componentes/componentesMobile/ContenidoCancionMobile"
import ContenidoPlaylistMobile from "./componentes/componentesMobile/ContenidoPlaylistMobile"

function App() {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Router>
      <Box sx={{ minHeight: "100vh", minWidth: "100vw", backgroundColor: "black", color: "white", overflow: "hidden" }}>
        <Routes>
          <Route path="/registro" element={<RegistroComponente />} />
          <Route path="/inicioSesion" element={<InicioSesion />} />
          <Route
            path="/"
            element={
              <>
                {isMdUp ? <PaginaHome /> : <ContenidoMobile />}
              </>
            }
          />
          <Route
            path="/contenido2"
            element={
              <>
                {isMdUp ? <PaginaExplorar /> : <ContenidoMobile />}
              </>
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
                {isMdUp ? <ContenidoCancion /> : <ContenidoPlaylistMobile />}
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  )
}

export default App

