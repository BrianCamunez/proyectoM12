import { Box } from "@mui/material"
import Navbar from "./Navbar"
import Player from "./Player"
import ContenidoExplorar from "./ContenidoExplorar"

const PaginaExplorar = () => {
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

