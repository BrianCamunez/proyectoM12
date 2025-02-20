import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const Contenido = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                paddingTop: 3,
                marginLeft: "225px",
                marginRight: 1,
                backgroundColor: "#121212",
                borderRadius: 2,
                minHeight: '100vh', // Ocupa toda la altura disponible
                overflowY: 'auto', // Permite scroll si el contenido es más grande que la altura
                "&::-webkit-scrollbar": {
                    width: "15px", // El tamaño del scroll
                    height: "50px"
                },
                "&::-webkit-scrollbar-track": {
                    borderRadius: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#2c2c2c", // Color del pulgar del scroll
                    borderRadius: "10px",
                    border: "2px solid #161246", // Color del borde del pulgar
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#aaaaaa", // Color al pasar el ratón sobre el pulgar
                },
            }}
        >
            <Box paddingX={2} marginBottom={20}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">Artistas populares</Typography>
                    <Typography variant="p">Mostrar todos</Typography>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: 2,
                        marginTop: 3,
                    }}
                >
                    {[...Array(6)].map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: "transparent",
                                borderRadius: 2,
                                padding: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={`https://definicion.com/wp-content/uploads/2022/09/imagen.jpg`} // Cambia las imágenes si lo prefieres
                                alt={`Artista ${index + 1}`}
                                sx={{
                                    borderRadius: "50%",
                                    width: "200px",
                                    height: "200px",
                                    margin: "0 auto",
                                }}
                            />
                            <CardContent>
                                <Typography variant="body1" color="white">
                                    {`Artista ${index + 1}`}
                                </Typography>
                                <Typography variant="body1" color="white">
                                    Artista
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Typography variant="h5">Álbumes y sencillos populares</Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: 2,
                        marginTop: 3,
                    }}
                >
                    {[...Array(6)].map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: "transparent",
                                borderRadius: 2,
                                padding: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={`https://definicion.com/wp-content/uploads/2022/09/imagen.jpg`} // Puedes usar diferentes imágenes o mantenerlas fijas
                                alt={`Artista ${index + 1}`}
                                sx={{
                                    borderRadius: 2,
                                    width: "200px",
                                    height: "200px",
                                    margin: "0 auto",
                                }}
                            />
                            <CardContent>
                                <Typography variant="body1" color="white">{`Artista ${index + 1
                                    }`}</Typography>
                                <Typography variant="body1" color="white">
                                    Artista
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Typography variant="h5">Emisoras populares</Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: 2,
                        marginTop: 3,
                    }}
                >
                    {[...Array(6)].map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: "transparent",
                                borderRadius: 2,
                                padding: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={`https://cdn0.uncomo.com/es/posts/5/4/2/como_conocer_los_colores_exactos_de_una_imagen_10245_600_square.jpg`} // Puedes usar diferentes imágenes o mantenerlas fijas
                                alt={`Artista ${index + 1}`}
                                sx={{
                                    borderRadius: 2,
                                    width: "200px",
                                    height: "200px",
                                    margin: "0 auto",
                                }}
                            />
                            <CardContent>
                                <Typography variant="body1" color="white">
                                    Varios artistas.
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Contenido;
