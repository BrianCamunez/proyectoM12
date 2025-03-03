import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const ContenidoPlaylist = () => {

    const canciones = [
        {
            id: 1,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
            addedDate: "2024-03-01",
            duration: "3:20",
        },
        {
            id: 2,
            title: "Shape of You",
            artist: "Ed Sheeran",
            album: "÷ (Divide)",
            image: "https://upload.wikimedia.org/wikipedia/en/4/45/Shape_of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
            addedDate: "2024-02-28",
            duration: "3:53",
        },
        {
            id: 3,
            title: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            image: "https://upload.wikimedia.org/wikipedia/en/2/22/Dua_Lipa_-_Levitating.png",
            addedDate: "2024-02-25",
            duration: "3:23",
        },
        {
            id: 4,
            title: "Bad Guy",
            artist: "Billie Eilish",
            album: "When We All Fall Asleep, Where Do We Go?",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Bad_Guy.png",
            addedDate: "2024-02-20",
            duration: "3:14",
        },
        {
            id: 5,
            title: "Peaches",
            artist: "Justin Bieber",
            album: "Justice",
            image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Justin_Bieber_-_Peaches.png",
            addedDate: "2024-02-15",
            duration: "3:18",
        },
        {
            id: 6,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
            addedDate: "2024-03-01",
            duration: "3:20",
        },
        {
            id: 7,
            title: "Shape of You",
            artist: "Ed Sheeran",
            album: "÷ (Divide)",
            image: "https://upload.wikimedia.org/wikipedia/en/4/45/Shape_of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
            addedDate: "2024-02-28",
            duration: "3:53",
        },
        {
            id: 8,
            title: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            image: "https://upload.wikimedia.org/wikipedia/en/2/22/Dua_Lipa_-_Levitating.png",
            addedDate: "2024-02-25",
            duration: "3:23",
        },
        {
            id: 9,
            title: "Bad Guy",
            artist: "Billie Eilish",
            album: "When We All Fall Asleep, Where Do We Go?",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Bad_Guy.png",
            addedDate: "2024-02-20",
            duration: "3:14",
        },
        {
            id: 10,
            title: "Peaches",
            artist: "Justin Bieber",
            album: "Justice",
            image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Justin_Bieber_-_Peaches.png",
            addedDate: "2024-02-15",
            duration: "3:18",
        },
        {
            id: 11,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
            addedDate: "2024-03-01",
            duration: "3:20",
        },
        {
            id: 12,
            title: "Shape of You",
            artist: "Ed Sheeran",
            album: "÷ (Divide)",
            image: "https://upload.wikimedia.org/wikipedia/en/4/45/Shape_of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
            addedDate: "2024-02-28",
            duration: "3:53",
        },
        {
            id: 13,
            title: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            image: "https://upload.wikimedia.org/wikipedia/en/2/22/Dua_Lipa_-_Levitating.png",
            addedDate: "2024-02-25",
            duration: "3:23",
        },
        {
            id: 14,
            title: "Bad Guy",
            artist: "Billie Eilish",
            album: "When We All Fall Asleep, Where Do We Go?",
            image: "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Bad_Guy.png",
            addedDate: "2024-02-20",
            duration: "3:14",
        },
        {
            id: 15,
            title: "Peaches",
            artist: "Justin Bieber",
            album: "Justice",
            image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Justin_Bieber_-_Peaches.png",
            addedDate: "2024-02-15",
            duration: "3:18",
        },
    ];


    return (
        <Box
            sx={{
                flexGrow: 1,
                paddingTop: 0,
                marginLeft: "225px",
                marginRight: 1,
                backgroundColor: "#121212",
                borderRadius: 2,
                minHeight: '100vh', // Ocupa toda la altura disponible
                overflowY: 'auto', // Permite scroll si el contenido es más grande que la altura
                "&::-webkit-scrollbar": {
                    width: "8px", // El tamaño del scroll
                },
                "&::-webkit-scrollbar-track": {
                    background: "#2a2a2a", // Color de la pista del scroll
                    borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#767612", // Color del pulgar del scroll
                    borderRadius: "10px",
                    border: "2px solid #161246", // Color del borde del pulgar
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#561234", // Color al pasar el ratón sobre el pulgar
                },
            }}
        >
            <Box marginBottom={10} sx={{ paddingTop: 0 }}>
                <Box position={"relative"}>
                    <Box display={"flex"} width={"100%"} padding={3} height={"500px"} sx={{ background: "linear-gradient(to bottom, #64B5F6 50%, #121212)" }}>
                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="imagen de la playlist" sx={{ width: "250px", height: "250px" }} />
                        <Box sx={{ marginLeft: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: "12px" }}>Lista</Typography>
                            <Typography variant="h2" fontWeight="bold" paddingY={1}>Nombre de la playlist</Typography>
                            <Typography variant="h6" sx={{ fontSize: "12px" }}>Con Feid, Arcángel, KAROL G y más</Typography>
                            <Typography variant="h6" sx={{ fontSize: "12px" }}>guardada 848.054 veces•50 canciones, 2 h 45 min aproximadamente</Typography>
                        </Box>
                    </Box>
                    <Box width={"100%"} padding={3} sx={{ backgroundColor: "rgba(0,0,0,0)" }} position={"absolute"} top={"300px"}>
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                            <Box display="flex" alignItems={"center"}>
                                <Box sx={{ width: "60px", height: "60px", backgroundColor: "#E91E63", borderRadius: "50%", color: "#000", alignItems: "center", justifyContent: "center", display: "flex" }}>
                                    <PlayArrowIcon fontSize="large" />
                                </Box>
                                <AddCircleOutlineIcon sx={{ width: "40px", height: "40px", paddingX: "20px", color: "#aeaeae" }} />
                                <MoreHorizIcon sx={{ width: "40px", height: "40px", color: "#aeaeae" }} />
                            </Box>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} marginRight="50px">
                                <Typography variant="h6" sx={{ fontSize: "12px", paddingRight: "5px", color:"#aeaeae", fontWeight:"bold" }}>Lista</Typography>
                                <FormatListBulletedIcon sx={{ width: "20px", height: "20px", color: "#aeaeae", marginBottom: "5px" }} />
                            </Box>
                        </Box>
                        <Box sx={{ flexGrow: 1, paddingTop: 3 }}>
                            <Grid container paddingRight={6}>
                                {/* Columna de 1 */}
                                <Grid item xs={12} sm={1} sx={{ borderBottom: "1px solid rgba(174, 174, 174, 0.2)" }} paddingBottom={"5px"}>
                                    <Box>
                                        <Typography sx={{ color: "#aeaeae", fontSize: "15px", textAlign: "center" }}>#</Typography>
                                    </Box>
                                </Grid>

                                {/* Columna de 4 */}
                                <Grid item xs={12} sm={4} sx={{ borderBottom: "1px solid rgba(174, 174, 174, 0.2)" }}>
                                    <Box>
                                        <Typography sx={{ color: "#aeaeae", fontSize: "15px" }}>Titulo</Typography>
                                    </Box>
                                </Grid>

                                {/* Columna de 3 */}
                                <Grid item xs={12} sm={3} sx={{ borderBottom: "1px solid rgba(174, 174, 174, 0.2)" }}>
                                    <Box>
                                        <Typography sx={{ color: "#aeaeae", fontSize: "15px" }}>Album</Typography>
                                    </Box>
                                </Grid>

                                {/* Columna de 3 */}
                                <Grid item xs={12} sm={3} sx={{ borderBottom: "1px solid rgba(174, 174, 174, 0.2)" }}>
                                    <Box>
                                        <Typography sx={{ color: "#aeaeae", fontSize: "15px" }}>Fecha que se añadio</Typography>
                                    </Box>
                                </Grid>

                                {/* Columna de 1 */}
                                <Grid item xs={12} sm={1} textAlign={"center"} sx={{ borderBottom: "1px solid rgba(174, 174, 174, 0.2)" }}>
                                    <AccessTimeIcon sx={{ color: "#aeaeae", fontSize: "18px", textAlign: "center" }} />
                                </Grid>
                            </Grid>
                            {canciones.map((song, index) => (
                                <Grid
                                    key={song.id}
                                    container
                                    paddingRight={6}
                                    alignItems="center"
                                    sx={{
                                        paddingY: 1,
                                        "&:hover": {
                                            backgroundColor: "#2c2c2c",
                                            transition: "0.3s",
                                            // Cambiar color del texto a blanco en el hover
                                            "& .numero-cancion, & .nombre-cancion, & .album-cancion": {
                                                color: "white", // Cambia el color de las letras
                                            },

                                            "& .duracion-cancion, & .fecha-cancion, & .numero-cancion-icono": {
                                                opacity: 1,
                                                transition: "opacity 0.3s ease-in-out",
                                            },

                                            "& .numero-cancion":{
                                                opacity: 0,
                                            }

                                        },

                                    }}
                                >
                                    {/* Número */}
                                    <Grid item xs={12} sm={1} display="flex" alignItems="center" justifyContent="center">
                                        <Typography className="numero-cancion" sx={{ color: "white", fontSize: "15px", textAlign: "center" }}>{index + 1}</Typography>
                                        <PlayArrowIcon className="numero-cancion-icono" sx={{ color: "#fff", fontSize: "18px", position:"absolute", right: "1395px", opacity: 0}} />
                                    </Grid>

                                    {/* Título y Artista */}
                                    <Grid item xs={12} sm={4} display="flex" alignItems="center">
                                        <Box
                                            component="img"
                                            src={song.image}
                                            alt={song.title}
                                            sx={{ width: 50, height: 50, borderRadius: 1, marginRight: 2 }}
                                        />
                                        <Box>
                                            <Typography sx={{ color: "white", fontSize: "15px" }}>{song.title}</Typography>
                                            <Typography className="nombre-cancion" sx={{ color: "#aeaeae", fontSize: "13px"}}>{song.artist}</Typography>
                                        </Box>
                                    </Grid>

                                    {/* Álbum */}
                                    <Grid item xs={12} sm={3} className="album-cancion">
                                        <Typography className="album-cancion" sx={{ color: "#aeaeae", fontSize: "15px" }}>{song.album}</Typography>
                                    </Grid>

                                    {/* Fecha */}
                                    <Grid item xs={12} sm={3} alignItems={"center"} display={"flex"} className="fecha-cancion">
                                        <Typography sx={{ color: "#aeaeae", fontSize: "15px" }}>{song.addedDate}</Typography>
                                        <AddCircleOutlineIcon className="fecha-cancion" sx={{ color: "#aeaeae", fontSize: "18px", position:"absolute", right: "165px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>

                                    {/* Duración */}
                                    <Grid item xs={12} sm={1} textAlign={"center"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                                        <Typography sx={{ color: "#aeaeae", fontSize: "15px" }}>{song.duration}</Typography>
                                        <MoreHorizIcon className="duracion-cancion" sx={{ color: "#aeaeae", fontSize: "18px", position:"absolute", right: "85px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ContenidoPlaylist;
