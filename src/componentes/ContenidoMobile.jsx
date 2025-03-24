import PlaylistPreferidasMobile from "./PlaylistPreferidasMobile"
import PlaylistRecomendadasMobile from "./PlaylistRecomendadasMobile"
import MenuAbajoMobile from "./MenuAbajoMobile"
import ReproductorMobile from "./ReproductorMobile"

import { Box } from "@mui/material"

const ContenidoMobile = () => {
    return (
        <>
            <Box display={"flex"} flexDirection={"column"}>
                <Box paddingBottom={"60px"}>
                    <PlaylistPreferidasMobile />
                    <PlaylistRecomendadasMobile />
                    <PlaylistRecomendadasMobile />
                    <PlaylistRecomendadasMobile />
                </Box>
                <ReproductorMobile/>
                <MenuAbajoMobile />
            </Box>
        </>
    )
}

export default ContenidoMobile