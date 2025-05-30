import { Box } from "@mui/material"
import Navbar from "./Navbar"
import ContenidoTemporal from "./ContenidoHome"
import Player from "./Player"

const PaginaHome = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", width: "100vw", height: { xs: "100%", md: "calc(100vh - 64px - 56px)" }, overflow: "hidden" }}>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
          <ContenidoTemporal />
        </Box>
      </Box>
      <Player/>
    </>
  )
}

export default PaginaHome

