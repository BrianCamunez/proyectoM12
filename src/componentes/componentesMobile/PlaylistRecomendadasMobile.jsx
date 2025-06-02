import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

const PlaylistRecomendadasMobile = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const { data, error } = await supabase
                .from("playlist")
                .select("id, nombre, imagen")
                .limit(6);

            if (error) {
                console.error("Error al obtener playlists:", error);
            } else {
                setPlaylists(data);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <Typography marginX={2} py={3}>Hecho para ti</Typography>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    gap: 2,
                    paddingBottom: 1,
                    marginLeft: 2,
                    marginRight: 3,
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {playlists.map((playlist) => (
                    <Box key={playlist.id} sx={{ flexShrink: 0 }}>
                        <Link to={`/playlistMobile/${playlist.id}`}>
                            <Box
                                component="img"
                                src={playlist.imagen || "https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"}
                                sx={{
                                    width: "100%",
                                    height: "150px",
                                    maxWidth: "150px",
                                    borderRadius: 2,
                                    objectFit: "cover"
                                }}
                            />
                        </Link>
                        <Box sx={{ width: "100%", maxWidth: "150px", mt: 1 }}>
                            <Typography variant="body2" color="white">
                                {playlist.nombre}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PlaylistRecomendadasMobile;
