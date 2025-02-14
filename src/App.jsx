// src/App.jsx
import React from 'react';
import { Box } from "@mui/material";
import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/Navbar";
import Player from './componentes/Player';
import Contenido from "./componentes/Contenido"

function App() {
  return (
    <Box sx={{ minHeight: "100vh",minWidth: '100vw' ,backgroundColor: "black", color: "white" }}>
      <Navbar />
      <Box sx={{ display: "flex", pt: '64px'}}> {/* Añadimos padding-top para evitar solapamiento con el navbar */}
        <Sidebar />
        <Contenido/>
      </Box>
      <Player />
    </Box>
  );
}

export default App;
