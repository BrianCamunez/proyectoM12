import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from "react-router-dom";

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
                    <Box display={"flex"} width={"100%"} padding={3} height={"500px"} sx={{ background: "linear-gradient(to bottom,rgb(233, 134, 211) 10%, #121212)" }}>
                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="imagen de la playlist" sx={{ width: "250px", height: "250px" }} />
                        <Box sx={{ marginLeft: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: "12px" }}>Cancion</Typography>
                            <Typography variant="h2" fontWeight="bold" paddingY={1}>Nombre de la playlist</Typography>
                            <Typography variant="h6" sx={{ fontSize: "12px", alignItems: "center", justifyContent: "center", alignContent: "center" }}><Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="Imagen cantante" sx={{ width: "30px", height: "30px", borderRadius: "50%" }} /> Bad Bunny•DeBí TiRaR MáS FOToS•2025•2:36•246.410.919</Typography>
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
                        </Box>
                        <Box alignItems={"center"} justifyContent={"space-between"} marginTop={2}>
                            <Box backgroundColor={"rgb(89, 163, 206)"} padding={2} borderRadius={2} alignItems={"center"} width={"550px"}>
                                <Typography variant="p" sx={{ color: "#fff" }}>Inicia sesión para ver la letra y escuchar la canción al completo</Typography>
                                <Box display="flex" alignItems={"center"} justifyContent={"right"}>
                                    <Typography variant="p" sx={{ color: "#fff" }}>Iniciar sesión</Typography>
                                    <Typography variant="p" sx={{ color: "#fff" }}>Registrarse</Typography>
                                </Box> 
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ContenidoPlaylist;
