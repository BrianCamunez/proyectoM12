import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ContenidoPlaylist = () => {
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
                    <Box display={"flex"} width={"100%"} padding={3} height={"500px"} sx={{ background: "linear-gradient(to bottom,rgb(233, 134, 211) 10%, #121212)" }}>
                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="imagen de la playlist" sx={{ width: "250px", height: "250px" }} />
                        <Box sx={{ marginLeft: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: "12px" }}>Cancion</Typography>
                            <Typography variant="h2" fontWeight="bold" paddingY={1}>Nombre de la playlist</Typography>
                            <Typography variant="h6" sx={{ fontSize: "12px", alignItems: "center", justifyContent: "center", alignContent: "center" }}><Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="Imagen cantante" sx={{ width: "30px", height: "30px", borderRadius: "50%" }} /> Bad Bunny•DeBí TiRaR MáS FOToS•2025•2:36•246.410.919</Typography>
                        </Box>
                    </Box>
                    <Box width={"100%"} padding={3} sx={{ backgroundColor: "rgba(0,0,0,0)" }} position={"absolute"} top={"300px"} paddingBottom={15}>
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                            <Box display="flex" alignItems={"center"}>
                                <Box sx={{ width: "60px", height: "60px", backgroundColor: "#E91E63", borderRadius: "50%", color: "#000", alignItems: "center", justifyContent: "center", display: "flex" }}>
                                    <PlayArrowIcon fontSize="large" />
                                </Box>
                                <AddCircleOutlineIcon sx={{ width: "40px", height: "40px", paddingX: "20px", color: "#aeaeae" }} />
                                <MoreHorizIcon sx={{ width: "40px", height: "40px", color: "#aeaeae" }} />
                            </Box>
                        </Box>
                        <Box alignItems={"center"} marginTop={2} display={"flex"}>
                            <Box backgroundColor={"#2e77d0"} padding={2} borderRadius={2} alignItems={"center"} width={"550px"}>
                                <Typography variant="p" sx={{ color: "#fff", fontWeight: 'bold' }}>Inicia sesión para ver la letra y escuchar la canción al completo</Typography>
                                <Box display="flex" alignItems={"center"} justifyContent={"right"} paddingTop={1} gap={1}>
                                    <Button><Typography variant="p" sx={{ color: "#fff" }} fontWeight={'bold'}>Iniciar sesión</Typography></Button>
                                    <Button><Typography variant="p" sx={{ color: "#000", backgroundColor: "white", paddingX: 3, paddingY: '10px', borderRadius: 10 }} fontWeight={'bold'}>Registrarse</Typography></Button>
                                </Box>
                            </Box>
                            <Box paddingLeft={30} display={'flex'}>
                                <Box component='img' src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="Imagen artista" sx={{ width: '100px', height: '100px', borderRadius: '50%' }}></Box>
                                <Box display={"flex"} flexDirection={'column'} justifyContent={"center"} paddingLeft={1}>
                                    <Typography fontWeight={'bold'}>Artista</Typography>
                                    <Typography fontWeight={'bold'}>Artista X</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Typography>Recomendaciones</Typography>
                            <Typography>Basadas en esta canción</Typography>
                            <Box sx={{ flexGrow: 1, paddingTop: 2 }} marginRight={6}>
                                <Grid container marginRight={"0px"} width={"100%"} sx={{
                                    padding: 1,
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

                                        "& .numero-cancion": {
                                            opacity: 0,
                                        }

                                    },

                                }}>
                                    <Grid item xs={12} sm={4}>
                                        <Box display={"flex"}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="cancion" sx={{ width: '50px', height: '50px', borderRadius: 2 }}></Box>
                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} paddingLeft={1}>
                                                <Typography fontSize={"16px"}>CAFé CON RON</Typography>
                                                <Typography fontSize={"14px"}>Bad bunny, Los Pleneros de la Cresta</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign={"end"} alignContent={"center"}>
                                        <Typography justifyContent={"center"}>100.000.000</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} display={"flex"} justifyContent={"end"} gap={3} alignItems={"center"}>
                                        <AddCircleOutlineIcon className="fecha-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                        <Typography>3:48</Typography>
                                        <MoreHorizIcon className="duracion-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>
                                </Grid>
                                <Grid container marginRight={"0px"} width={"100%"} sx={{
                                    padding: 1,
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

                                        "& .numero-cancion": {
                                            opacity: 0,
                                        }

                                    },

                                }}>
                                    <Grid item xs={12} sm={4}>
                                        <Box display={"flex"}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="cancion" sx={{ width: '50px', height: '50px', borderRadius: 2 }}></Box>
                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} paddingLeft={1}>
                                                <Typography fontSize={"16px"}>CAFé CON RON</Typography>
                                                <Typography fontSize={"14px"}>Bad bunny, Los Pleneros de la Cresta</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign={"end"} alignContent={"center"}>
                                        <Typography justifyContent={"center"}>100.000.000</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} display={"flex"} justifyContent={"end"} gap={3} alignItems={"center"}>
                                        <AddCircleOutlineIcon className="fecha-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                        <Typography>3:48</Typography>
                                        <MoreHorizIcon className="duracion-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>
                                </Grid>
                                <Grid container marginRight={"0px"} width={"100%"} sx={{
                                    padding: 1,
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

                                        "& .numero-cancion": {
                                            opacity: 0,
                                        }

                                    },

                                }}>
                                    <Grid item xs={12} sm={4}>
                                        <Box display={"flex"}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="cancion" sx={{ width: '50px', height: '50px', borderRadius: 2 }}></Box>
                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} paddingLeft={1}>
                                                <Typography fontSize={"16px"}>CAFé CON RON</Typography>
                                                <Typography fontSize={"14px"}>Bad bunny, Los Pleneros de la Cresta</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign={"end"} alignContent={"center"}>
                                        <Typography justifyContent={"center"}>100.000.000</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} display={"flex"} justifyContent={"end"} gap={3} alignItems={"center"}>
                                        <AddCircleOutlineIcon className="fecha-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                        <Typography>3:48</Typography>
                                        <MoreHorizIcon className="duracion-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>
                                </Grid>
                                <Grid container marginRight={"0px"} width={"100%"} sx={{
                                    padding: 1,
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

                                        "& .numero-cancion": {
                                            opacity: 0,
                                        }

                                    },

                                }}>
                                    <Grid item xs={12} sm={4}>
                                        <Box display={"flex"}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="cancion" sx={{ width: '50px', height: '50px', borderRadius: 2 }}></Box>
                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} paddingLeft={1}>
                                                <Typography fontSize={"16px"}>CAFé CON RON</Typography>
                                                <Typography fontSize={"14px"}>Bad bunny, Los Pleneros de la Cresta</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign={"end"} alignContent={"center"}>
                                        <Typography justifyContent={"center"}>100.000.000</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} display={"flex"} justifyContent={"end"} gap={3} alignItems={"center"}>
                                        <AddCircleOutlineIcon className="fecha-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                        <Typography>3:48</Typography>
                                        <MoreHorizIcon className="duracion-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>
                                </Grid>
                                <Grid container marginRight={"0px"} width={"100%"} sx={{
                                    padding: 1,
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

                                        "& .numero-cancion": {
                                            opacity: 0,
                                        }

                                    },

                                }}>
                                    <Grid item xs={12} sm={4}>
                                        <Box display={"flex"}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="cancion" sx={{ width: '50px', height: '50px', borderRadius: 2 }}></Box>
                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} paddingLeft={1}>
                                                <Typography fontSize={"16px"}>CAFé CON RON</Typography>
                                                <Typography fontSize={"14px"}>Bad bunny, Los Pleneros de la Cresta</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign={"end"} alignContent={"center"}>
                                        <Typography justifyContent={"center"}>100.000.000</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} display={"flex"} justifyContent={"end"} gap={3} alignItems={"center"}>
                                        <AddCircleOutlineIcon className="fecha-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                        <Typography>3:48</Typography>
                                        <MoreHorizIcon className="duracion-cancion" sx={{ color: "#aeaeae", fontSize: "18px", opacity: 0, transition: "opacity 0.3s ease-in-out", }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ContenidoPlaylist;
