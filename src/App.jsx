import React from 'react';
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/Navbar";
import Player from './componentes/Player';
import Contenido from "./componentes/Contenido"
import Contenido2 from "./componentes/Contenido2"

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: "100vh", minWidth: '100vw', backgroundColor: "black", color: "white", overflow: "hidden" }}>
        <Navbar />
        <Box sx={{ display: "flex", pt: '64px', height: 'calc(100vh - 64px)', overflow: "hidden" }}> {/* Añadimos padding-top para evitar solapamiento con el navbar */}
          <Sidebar />
          <Routes>
            <Route path="/" element={<Contenido />} />
            <Route path="/contenido2" element={<Contenido2 />} />
          </Routes>
        </Box>
        <Player />
      </Box>
    </Router>
  );
}

export default App;
