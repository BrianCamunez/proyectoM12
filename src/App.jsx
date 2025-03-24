import { Box, useMediaQuery, useTheme } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./componentes/Sidebar"
import Navbar from "./componentes/Navbar"
import Player from "./componentes/Player"
import Contenido from "./componentes/PaginaHome"
import Contenido2 from "./componentes/Contenido2"
import RegistroComponente from "./componentes/RegistroComponente"
import InicioSesion from "./componentes/InicioSesion"
import ContenidoPlaylist from "./componentes/ContenidoPlaylist"
import ContenidoCancion from "./componentes/ContenidoCancion"
import NavbarMobile from "./componentes/componentesMobile/NavbarMobile"
import ContenidoMobile from "./componentes/ContenidoMobile"


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
                {isMdUp ? <Contenido /> : <ContenidoMobile />}
              </>
            }
          />
          <Route
            path="/contenido2"
            element={
              <>
                <Navbar />
                <Box sx={{ display: "flex", pt: "64px", height: "calc(100vh - 64px)", overflow: "hidden" }}>
                  {isMdUp && <Sidebar />}
                  <Box sx={{ flexGrow: 1, display: "flex", justifyContent: isMdUp ? "flex-start" : "center" }}>
                    <Contenido2 />
                  </Box>
                </Box>
                <Player />
              </>
            }
          />
          <Route
            path="/playlist"
            element={
              <>
                <Navbar />
                <Box sx={{ display: "flex", pt: "64px", height: "calc(100vh - 64px)", overflow: "hidden" }}>
                  {isMdUp && <Sidebar />}
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
                <Navbar />
                <Box sx={{ display: "flex", pt: "64px", height: "calc(100vh - 64px)", overflow: "hidden" }}>
                  {isMdUp && <Sidebar />}
                  <Box sx={{ flexGrow: 1, display: "flex", justifyContent: isMdUp ? "flex-start" : "center" }}>
                    <ContenidoCancion />
                  </Box>
                </Box>
                <Player />
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  )
}

export default App

