import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SpeakerIcon from '@mui/icons-material/Speaker';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from "react-router-dom";
import PauseIcon from "@mui/icons-material/Pause";

const ReproductorMobile = () => {

    const [reproduciendo, setReproduciendo] = useState(false);

    const handleIconClick = () => {
        setReproduciendo(!reproduciendo); // Alternar el estado
      };

    return (
        <>
            <Box display={"flex"} width={"100%"} position={"absolute"} bottom={58} alignItems={"center"}>
                <Box
                    display={"flex"}
                    padding={1}
                    sx={{
                        backgroundColor: "#ff4081",
                        marginX: 1,
                        width: "100%",
                        borderRadius: 2,
                        alignItems: "center"
                    }}
                >
                    <Link to="/cancion" style={{ textDecoration: "none", color: "white", width: "100%" }}>
                        <Box display={"flex"} alignItems={"center"}>
                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"40px"} height={"40px"} borderRadius={2} />
                            <Box ml={1}>
                                <Box>Bones · Imagine Dragons</Box>
                                <Box>JBL Live 770NC</Box>
                            </Box>
                        </Box>
                    </Link>
                    <Box display={"flex"} alignItems={"center"} paddingRight={1}>
                        <SpeakerIcon sx={{ fontSize: 30, marginRight: 2 }} />
                        <IconButton onClick={handleIconClick} aria-label="Volver atrás">
                            {reproduciendo ? (
                                <PlayArrowIcon sx={{ fontSize: 30, color:"white" }} />
                            ) : (
                                <PauseIcon sx={{ fontSize: 30, color:"white"}} />
                            )}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ReproductorMobile;
