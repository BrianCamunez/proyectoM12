// src/App.jsx
import React from 'react';
import { Box } from "@mui/material";
import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/Navbar";
import Player from './componentes/Player';

function App() {
  return (
    <>
    <Navbar />
    <Box sx={{ display: "flex", pt: '64px' }}> {/* Añadimos padding-top para que no se solape con el navbar */}
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <h1>Bienvenido a tu Spotify Clone</h1>
      </Box>
    </Box>
    <Player />
  </>
  );
}

export default App;
