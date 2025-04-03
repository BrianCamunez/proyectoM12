import { Box, Grid, Typography } from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Link } from "react-router-dom";

const ContenidoBibliotecaGridMobile = () => {

    const canciones = Array.from({ length: 10 }, (_, index) => index);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={4} key={0}>
                    <Link to="/playlistMobile" style={{ textDecoration: "none", color: "white" }}>
                        <Box>
                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100%"} height={"100%"} borderRadius={2} sx={{ objectFit: "cover" }} />
                            <Box justifyContent={"center"} display={"flex"} flexDirection={"column"} paddingLeft={1}>
                                <Box>Canciones que te gustan</Box>
                                <Box display={"flex"} justifyContent={"center"}>
                                    <PushPinIcon sx={{ fontSize: "18px"}}/>
                                    <ArrowCircleDownIcon  sx={{ fontSize: "18px"}}/> Lista · 582 canciones
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                </Grid>
                {canciones.map((_, index) => (
                    <Grid item xs={4} key={index}>
                        <Link to="/playlistMobile" style={{ textDecoration: "none", color: "white" }}>
                            <Box>
                                <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100%"} height={"100%"} borderRadius={2} sx={{ objectFit: "cover" }} />
                                <Box justifyContent={"center"} display={"flex"} flexDirection={"column"} paddingLeft={1}>
                                    <Box>Canciones que te gustan</Box>
                                    <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}> Lista · CreadorPlaylist</Typography>
                                </Box>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ContenidoBibliotecaGridMobile