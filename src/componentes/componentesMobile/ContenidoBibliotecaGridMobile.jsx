import { Box, Grid, Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Link } from "react-router-dom";

const ContenidoBibliotecaGridMobile = ({ playlists }) => {
    return (
        <Grid container spacing={1}>
            {/* Playlists reales del usuario */}
            {playlists.map((playlist) => (
                <Grid item xs={4} key={playlist.id}>
                    <Link to={`/playlistMobile/${playlist.id}`} style={{ textDecoration: "none", color: "white" }}>
                        <Box>
                            <Box
                                component="img"
                                src={playlist.imagen}
                                sx={{
                                    width: "100%",           // toma el ancho del contenedor
                                    aspectRatio: "1 / 1",    // asegura forma cuadrada
                                    objectFit: "cover",      // recorta la imagen sin deformar
                                    borderRadius: 2,
                                }}
                            />

                            <Box mt={1} px={1}>
                                <Typography fontWeight="bold" fontSize="14px" noWrap>
                                    {playlist.nombre}
                                </Typography>
                                <Typography fontSize="12px" color="#b3b3b3" noWrap>
                                    Lista · {playlist.usuarios?.nombre || "Tú"}
                                </Typography>
                            </Box>
                        </Box>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default ContenidoBibliotecaGridMobile;
