import React from 'react';
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/Navbar";
import Player from './componentes/Player';
import Contenido from "./componentes/Contenido";
import Contenido2 from "./componentes/Contenido2";
import RegistroComponente from './componentes/RegistroComponente';
import InicioSesion from './componentes/InicioSesion';
import ContenidoPlaylist from './componentes/ContenidoPlaylist';

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: "100vh", minWidth: '100vw', backgroundColor: "black", color: "white", overflow: "hidden" }}>
        {/* Definimos las rutas y ocultamos el Header, Sidebar y Player solo cuando estamos en '/registro' */}
        <Routes>
          <Route path="/registro" element={<RegistroComponente />} />
          <Route path="/inicioSesion" element={<InicioSesion />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />  {/* Navbar visible en todas las rutas excepto '/registro' */}
                <Box sx={{ display: "flex", pt: '64px', height: 'calc(100vh - 64px)', overflow: "hidden" }}>
                  <Sidebar />  {/* Sidebar visible en todas las rutas excepto '/registro' */}
                  <Contenido />
                </Box>
                <Player />  {/* Player visible en todas las rutas excepto '/registro' */}
              </>
            }
          />
            <Route
            path="/contenido2"
            element={
              <>
                <Navbar />  {/* Navbar visible en todas las rutas excepto '/registro' */}
                <Box sx={{ display: "flex", pt: '64px', height: 'calc(100vh - 64px)', overflow: "hidden" }}>
                  <Sidebar />  {/* Sidebar visible en todas las rutas excepto '/registro' */}
                  <Contenido2 />
                </Box>
                <Player />  {/* Player visible en todas las rutas excepto '/registro' */}
              </>
            }
          />
           <Route
            path="/playlist"
            element={
              <>
                <Navbar />  {/* Navbar visible en todas las rutas excepto '/registro' */}
                <Box sx={{ display: "flex", pt: '64px', height: 'calc(100vh - 64px)', overflow: "hidden" }}>
                  <Sidebar />  {/* Sidebar visible en todas las rutas excepto '/registro' */}
                  <ContenidoPlaylist />
                </Box>
                <Player />  {/* Player visible en todas las rutas excepto '/registro' */}
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
