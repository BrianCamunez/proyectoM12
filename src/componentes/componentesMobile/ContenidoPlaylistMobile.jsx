import React from "react";
import { Box } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ContenidoPlaylistMobile = () => {

    const items = Array.from({ length: 6 });

    return (
        <>
            <Box pt={3} mx={2}>
                <Box justifyContent={"center"} alignContent={"center"} display={"flex"}>
                    <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"300px"} height={"300px"} />
                </Box>
                <Box py={2}>
                    <Box>Ado, Pharozen, LiSA y más</Box>
                    <Box>Especialmente para ti <InfoIcon /> Acerca de las recomendaciones</Box>
                </Box>
                <Box>2h 54m</Box>
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
                <Box>
                    {items.map((_, index) => (
                        <Box key={index} display={"flex"} py={1} justifyContent={"space-between"} alignItems={"center"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"40px"} height={"40px"} borderRadius={2} />
                                <Box ml={1}>
                                    <Box>RuLe</Box>
                                    <Box><ArrowCircleDownIcon sx={{ fontSize: '16px' }}/> Ado</Box>
                                </Box>
                            </Box>
                            <Box>
                                <CheckCircleIcon sx={{paddingRight: 2, fontSize: "16px"}}/>
                                <MoreHorizIcon sx={{ fontSize: '16px' }}/>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default ContenidoPlaylistMobile