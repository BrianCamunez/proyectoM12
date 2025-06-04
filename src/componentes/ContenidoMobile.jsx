import PlaylistPreferidasMobile from "./componentesMobile/PlaylistPreferidasMobile"
import PlaylistRecomendadasMobile from "./componentesMobile/PlaylistRecomendadasMobile"
import MenuAbajoMobile from "./componentesMobile/MenuAbajoMobile"
import ReproductorMobile from "./componentesMobile/ReproductorMobile"
import { useEffect } from "react"
import { supabase } from "../supabase/supabase"
import { useNavigate } from "react-router-dom"

import { Box } from "@mui/material"
import NavbarMobile from "./componentesMobile/NavbarMobile"

const ContenidoMobile = () => {
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
            <Box display={"flex"} flexDirection={"column"}>
                <NavbarMobile/>
                <Box paddingBottom={"60px"}>
                    <PlaylistPreferidasMobile />
                    <PlaylistRecomendadasMobile />
                    <PlaylistRecomendadasMobile />
                    <PlaylistRecomendadasMobile />
                </Box>
                <ReproductorMobile />
                <MenuAbajoMobile />
            </Box>
        </>
    )
}

export default ContenidoMobile