import PlaylistPreferidasMobile from "./componentesMobile/PlaylistPreferidasMobile"
import PlaylistRecomendadasMobile from "./componentesMobile/PlaylistRecomendadasMobile"
import MenuAbajoMobile from "./componentesMobile/MenuAbajoMobile"
import ReproductorMobile from "./componentesMobile/ReproductorMobile"

import { Box } from "@mui/material"
import NavbarMobile from "./componentesMobile/NavbarMobile"

const ContenidoMobile = () => {
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