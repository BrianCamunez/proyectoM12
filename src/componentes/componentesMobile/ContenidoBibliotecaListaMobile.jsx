import { Box } from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Link } from "react-router-dom";


const ContenidoBibliotecaListaMobile = () => {

    const canciones = Array.from({ length: 10 }, (_, index) => index);

    return (
        <>
            <Link to="/playlistMobile" style={{ textDecoration: "none", color: "white" }}>
                <Box display={"flex"}>
                    <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100px"} height={"100px"} />
                    <Box justifyContent={"center"} display={"flex"} flexDirection={"column"} paddingLeft={1}>
                        <Box>Canciones que te gustan</Box>
                        <Box display={"flex"} justifyContent={"center"}><PushPinIcon /><ArrowCircleDownIcon /> Lista · 582 canciones</Box>
                    </Box>
                </Box>
            </Link>
            {canciones.map((_, index) => (
                <Link to="/playlistMobile" style={{ textDecoration: "none", color: "white" }} key={index}>
                    <Box display={"flex"} paddingY={1}>
                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100px"} height={"100px"} />
                        <Box justifyContent={"center"} display={"flex"} flexDirection={"column"} paddingLeft={1}>
                            <Box>Canciones que te gustan</Box>
                            <Box>Lista · CreadorDeLaPlaylist</Box>
                        </Box>
                    </Box>
                </Link>
            ))}
        </>
    )
}

export default ContenidoBibliotecaListaMobile