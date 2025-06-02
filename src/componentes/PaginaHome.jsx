// src/componentes/PaginaHome.jsx
import React from "react";
import { Slide, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Player from "./Player";

const PaginaHome = () => {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {/* HEADER fijo */}
      {isMdUp && (
        <Navbar/>
      )}
      {/* Aquí se inyectará el layout de 3 columnas o cualquier otro Outlet */}
      <Slide direction="right" in mountOnEnter timeout={300}>
        <div style={{ width: "100%", height: "100%" }}>
          <Outlet />
        </div>
      </Slide>

      {/* PLAYER fijo abajo */}
      {isMdUp && (
        <Player />
      )}
    </>
  );
};

export default PaginaHome;
