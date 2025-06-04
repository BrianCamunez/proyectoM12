import { Box } from "@mui/material"
import Navbar from "./Navbar"
import Player from "./Player"
import ContenidoExplorar from "./ContenidoExplorar"
import { useEffect } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const PaginaExplorar = () => {

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
      <Navbar />
      <Box sx={{ display: "flex", height: { xs: "100%", md: "calc(100vh - 64px)" }, overflow: "hidden" }}>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
          <ContenidoExplorar />
        </Box>
      </Box>
      <Player/>
    </>
  )
}

export default PaginaExplorar

