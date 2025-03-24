import PlaylistPreferidasMobile from "./PlaylistPreferidasMobile"
import PlaylistRecomendadasMobile from "./PlaylistRecomendadasMobile"

import { Box } from "@mui/material"

const ContenidoMobile = () =>{
    return (
        <>
            <Box display={"flex"} flexDirection={"column"}>
            <PlaylistPreferidasMobile/>
            <PlaylistRecomendadasMobile/>
            </Box>
        </>
    )
}

export default ContenidoMobile