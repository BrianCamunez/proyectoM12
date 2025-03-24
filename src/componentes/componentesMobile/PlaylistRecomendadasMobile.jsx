import React from "react";
import { Box, Typography } from "@mui/material";

const PlaylistRecomendadasMobile = () => {
    const items = Array.from({ length: 6 }); // Crear 6 elementos para la galería

    return (
        <Box sx={{ width: "100%" }}>
            <Typography marginX={2} py={3}>Hecho para X</Typography>
            
            <Box
                sx={{
                    display: "flex",  // Alinea los elementos en fila
                    overflowX: "auto",  // Permite el desplazamiento horizontal
                    scrollBehavior: "smooth",  // Desplazamiento suave
                    gap: 2,  // Espacio entre las imágenes
                    paddingBottom: 1,  // Espacio adicional en la parte inferior si es necesario
                    marginLeft: 2,
                    marginRight: 3,
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {items.map((_, index) => (
                    <Box key={index} sx={{ flexShrink: 0 }}>
                        <Box
                            component="img"
                            src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"
                            sx={{
                                width: "100%",  // Las imágenes ocupan todo el ancho disponible
                                height: "150px",  // Mantienen la relación de aspecto
                                maxWidth: "150px",  // Ancho máximo para las imágenes
                                borderRadius: 2,
                            }}
                        />
                        <Box sx={{width: "100%", maxWidth: "150px"}}>Tres artistas y poner y mas</Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PlaylistRecomendadasMobile;
