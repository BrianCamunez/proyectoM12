import React, { useEffect, useState } from "react";
import { Box, Grid, Button, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from "../../supabase/supabase";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";

const ContenidoPlaylistMobile = () => {
    const { id } = useParams(); // 👈 obtenemos el ID desde la URL
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBackClick = () => navigate(-1);

    useEffect(() => {
        const fetchPlaylist = async () => {
            const { data, error } = await supabase
                .from("playlist")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error al cargar la playlist:", error);
            } else {
                setPlaylist(data);
            }

            setLoading(false);
        };

        fetchPlaylist();
    }, [id]);

    if (loading || !playlist) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" color="white">
                Cargando...
            </Box>
        );
    }

    return (
        <>
            <Box display={"flex"} flexDirection={"column"}>
                <Box>
                    <ArrowBackIosIcon onClick={handleBackClick} sx={{ padding: 2, fontSize: "25px", color: "white", position: "absolute", marginLeft: 1, marginTop: 1 }} />
                    <Box pt={3} mx={2}>
                        <Box justifyContent={"center"} alignContent={"center"} display={"flex"}>
                            <Box component="img" src={playlist.imagen} width={"300px"} height={"300px"} />
                        </Box>
                        <Box py={2}>
                            <Typography fontWeight="bold">{playlist.nombre}</Typography>
                            <Box>{playlist.descripcion || "Sin descripción"} <InfoIcon /></Box>
                        </Box>
                        <Box>Duración estimada</Box>
                        <Box py={2} display={"flex"} justifyContent={"space-between"}>
                            <Box display={"flex"} gap={2}>
                                <AddCircleOutlineIcon />
                                <ArrowCircleDownIcon />
                                <MoreHorizIcon />
                            </Box>
                            <Box>
                                <ShuffleIcon sx={{ paddingRight: 2 }} />
                                <PlayCircleIcon />
                            </Box>
                        </Box>

                        {/* Aquí podés renderizar canciones si las tenés relacionadas */}

                        <Box py={2}>También puede que te gusten</Box>
                        <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
                            <Grid container width={"100%"} paddingX={2} spacing={2}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Grid item xs={4} key={index}>
                                        <Button sx={{ textTransform: "none", padding: 0, width: "100%" }}>
                                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100%"} height={"auto"} />
                                        </Button>
                                        <Box my={1}>Playlist sugerida</Box>
                                        <Box>Descripción corta</Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                <ReproductorMobile />
                <MenuAbajoMobile />
            </Box>
        </>
    );
};

export default ContenidoPlaylistMobile;
