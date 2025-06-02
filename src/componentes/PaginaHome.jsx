// src/componentes/PaginaHome.jsx
import React from "react";
import { Slide } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Player from "./Player";

const PaginaHome = () => {
  return (
    <>
      {/* HEADER fijo */}
      <Navbar />

      {/* Aquí se inyectará el layout de 3 columnas o cualquier otro Outlet */}
      <Slide direction="right" in mountOnEnter timeout={300}>
        <div style={{ width: "100%", height: "100%" }}>
          <Outlet />
        </div>
      </Slide>

      {/* PLAYER fijo abajo */}
      <Player />
    </>
  );
};

export default PaginaHome;
