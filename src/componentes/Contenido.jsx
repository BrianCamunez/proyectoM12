// src/componentes/Contenido.jsx
import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";


import ContenidoBiblioteca from "./ContenidoBiblioteca";
import ContenidoCancionLateral from "./ContenidoCancionLateral";

const Contenido = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        paddingTop: "64px", // deja hueco para el Navbar fijo
        height: "calc(100vh - 64px - 90px)", // resta altura del Player
        backgroundColor: "#000000",
      }}
    >
      {/* Columna izquierda fija */}
      <ContenidoBiblioteca />

      {/* Columna central: aquí irán los componentes según la ruta */}
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 2,
          overflowY: "auto",
          backgroundColor: "#121212",
        }}
      >
        <Outlet />
      </Box>

      {/* Columna derecha fija */}
      <ContenidoCancionLateral />
    </Box>
  );
};

export default Contenido;
