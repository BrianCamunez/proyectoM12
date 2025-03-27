import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ContenidoCantanteMobile = () => {

    const items = Array.from({ length: 10 });

    const items2 = Array.from({ length: 4 });

    const items3 = Array.from({ length: 3 });

    return (
        <>
            <Box>
                <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100%"} height={"450px"} position={"absolute"} />
                <Box mx={2} pt={'450px'}>
                    <Box my={2}>6,6M oyentes mensuales</Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Box display={"flex"}>
                            <Box>
                                <Button>Seguir</Button>
                            </Box>
                            <MoreHorizIcon />
                        </Box>
                        <Box display={"flex"}>
                            <ShuffleIcon />
                            <PlayCircleIcon />
                        </Box>
                    </Box>
                    <Box>Populares</Box>
                    <Box>
                        {items.map((_, index) => (
                            <Box key={index} display={"flex"} py={1} justifyContent={"space-between"} alignItems={"center"}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box pr={1}>{index + 1}</Box>
                                    <Link to="/cancion">
                                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"40px"} height={"40px"} borderRadius={2} />
                                    </Link>
                                    <Box ml={1}>
                                        <Box>RuLe</Box>
                                        <Box> 44.680.430</Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <CheckCircleIcon sx={{ paddingRight: 2, fontSize: "16px" }} />
                                    <MoreHorizIcon sx={{ fontSize: '16px' }} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box justifyContent={"center"} display={"flex"} py={2}>
                        <Button>Ver más</Button>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} pb={2}>
                        <Box>Tiulos populares</Box>
                        <Box>Mostrar todos</Box>
                    </Box>
                    <Box>
                        {items2.map((_, index) => (
                            <Box key={index} display={"flex"} py={1}>
                                <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"80px"} height={"80px"} />
                                <Box alignContent={"center"} pl={2}>
                                    <Box>INSIDE</Box>
                                    <Box>2024 · EP</Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} py={2}>
                        <Button>Ver discografía</Button>
                    </Box>
                    <Box>Incluye a HOYO-MiX</Box>
                    <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
                        <Grid container width={"100%"} spacing={2}>
                            {items3.map((_, index) => (
                                <Grid item xs={4} key={index} justifyContent={"center"} my={1}>
                                    <Button sx={{ textTransform: "none", padding: 0, width: "100%" }}>
                                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"100%"} height={"auto"} />
                                    </Button>
                                    <Box my={1}>Crunchyroll Anime Awards Winners</Box>
                                    <Box>The best of anime, ...</Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )

}

export default ContenidoCantanteMobile