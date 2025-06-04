// src/componentes/PaginaHome.jsx
import { useEffect } from "react";
import { Slide, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase"; 

import Navbar from "./Navbar";
import Player from "./Player";

const PaginaHome = () => {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  useEffect(() => {
      const validarSesion = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/registro");
        }
      };
      validarSesion();
    }, []);

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
