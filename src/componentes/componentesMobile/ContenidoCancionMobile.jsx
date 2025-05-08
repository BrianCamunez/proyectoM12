import React from "react";
import { Box, Button, Grid } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LinearProgress } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import IosShareIcon from '@mui/icons-material/IosShare';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { useNavigate } from 'react-router-dom';

const ContenidoCancionMobile = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // retrocede una página en el historial
    };

    return (
        <>
            <Box marginX={2}>
                <Box display={"flex"} justifyContent={"space-between"} paddingTop={2}>
                    <KeyboardArrowDownIcon  onClick={handleBackClick}/>
                    <Box>Reproduciendo canciones recomendadas</Box>
                    <MoreHorizIcon />
                </Box>
                <Box height={"70vh"} />
                <Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Box display={"flex"}>
                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"40px"} height={"40px"} borderRadius={2} />
                            <Box paddingLeft={1}>
                                <Box>Take Me Back To Eden</Box>
                                <Box>Sleep Token</Box>
                            </Box>
                        </Box>
                        <Box>
                            <RemoveCircleOutlineIcon />
                            <AddCircleOutlineIcon sx={{ paddingLeft: 1 }} />
                        </Box>
                    </Box>
                    <Box pt={1}>
                        <LinearProgress />
                    </Box>
                    <Box display={"flex"} justifyContent={"space-around"} pt={2} sx={{ fontSize: "35px" }}>
                        <ShuffleIcon fontSize="" />
                        <SkipPreviousIcon fontSize="" />
                        <PlayCircleFilledIcon fontSize="" />
                        <SkipNextIcon fontSize="" />
                        <RepeatIcon fontSize="" />
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} pt={1}>
                        <Box display={"flex"}>
                            <HeadphonesIcon sx={{ paddingRight: 1 }} />
                            <Box alignContent={"center"}>JBL Live 770NC</Box>
                        </Box>
                        <Box alignContent={"center"} display={"flex"}>
                            <IosShareIcon />
                            <ViewStreamIcon sx={{ paddingTop: "3px", paddingLeft: 1 }} />
                        </Box>
                    </Box>
                </Box>
                <Box marginTop={3} p={1} px={2} sx={{ backgroundColor: "#121212", borderRadius: 2 }}>
                    <Box py={2}>Descubre más de Bring Me The Horizon</Box>
                    <Grid container spacing={2}>
                        {/* Columna 1 */}
                        <Grid item xs={4}>
                            <Box sx={{ backgroundColor: "lightgray", borderRadius: 2, height: "150px" }}>
                                <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" sx={{width: "100%", height: "100%", objectFit: "cover"}}></Box>
                            </Box>
                        </Grid>

                        {/* Columna 2 */}
                        <Grid item xs={4}>
                            <Box sx={{ backgroundColor: "lightgray", borderRadius: 2, height: "150px" }}>
                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" sx={{width: "100%", height: "100%", objectFit: "cover"}}></Box>
                            </Box>
                        </Grid>

                        {/* Columna 3 */}
                        <Grid item xs={4}>
                            <Box sx={{ backgroundColor: "lightgray", borderRadius: 2, height: "150px" }}>
                            <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" sx={{width: "100%", height: "100%", objectFit: "cover"}}></Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2} borderRadius={3} sx={{backgroundColor: "#121212"}}>
                    <Box sx={{ backgroundImage: 'url("https://definicion.com/wp-content/uploads/2022/09/imagen.jpg")', height: 200, borderTopLeftRadius: 5,  borderTopRightRadius: 5, width: "100%", objectFit: "cover"}}>
                        <Box p={1}>Información del artista</Box>
                    </Box>
                    <Box padding={1}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box>
                                <Box>Bad Omens</Box>
                                <Box>5,2 M oyentes mensuales</Box>
                            </Box>
                            <Button>Seguir</Button>
                        </Box>
                        <Box pt={1}>Our sophorme album Tsunami Sea is available now.</Box>
                    </Box>          
                </Box>
                <Box my={3} sx={{backgroundColor: "#121212"}} borderRadius={2} p={2}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Box>Créditos</Box>
                        <Box>Ver todos</Box>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} pt={2}> 
                        <Box py={1}>
                            <Box>Bring Me The Horizon</Box>
                            <Box>Artista principal, Composición, Letrista</Box>
                        </Box>
                        <Button>Seguir</Button>
                    </Box>
                    <Box py={1}>
                        <Box>Zakk Cervini</Box>
                        <Box>Productor</Box>
                    </Box>
                    <Box py={1}>
                        <Box>Evil Twin</Box>
                        <Box>Productor</Box>
                    </Box>
                </Box>
            </Box>
        </>
    )

}

export default ContenidoCancionMobile