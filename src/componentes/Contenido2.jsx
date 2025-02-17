import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const Contenido2 = () => {
    const cardData = [
        { color: "#761212", text: "Musica 1" },
        { color: "#767612", text: "Musica 2" },
        { color: "#761276", text: "Musica 3" },
        { color: "#161246", text: "Musica 4" },
        { color: "#768912", text: "Musica 1" },
        { color: "#767689", text: "Musica 2" },
        { color: "#131970", text: "Musica 3" },
        { color: "#168901", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" }
    ];

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
            <Box paddingX={2} paddingTop={4} marginBottom={20}>
                <Typography variant="h5" fontWeight={'bold'}>Explorar todo</Typography>
                <Box 
                    sx={{
                        display: 'grid', 
                        gridTemplateColumns: "repeat(4, 1fr)", 
                        gap: 2, 
                        marginTop: 3, 
                    }}
                >
                    {cardData.map((card, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: card.color,
                                borderRadius: 3,
                                padding: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardContent sx={{ width: "200px", height: "120px" }}>
                                <Typography variant="body1" color="white" fontWeight={'bold'}>
                                    {card.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Contenido2;
