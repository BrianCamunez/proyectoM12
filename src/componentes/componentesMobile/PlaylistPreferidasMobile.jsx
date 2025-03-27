import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PlaylistPreferidasMobile = () => {

    const items = Array.from({ length: 8 });

    return (
        <>
            <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
                <Grid container width={"100%"} paddingX={2} spacing={1}>
                    {items.map((_, index) => (
                        <Grid item xs={6} key={index} width={"100%"} justifyContent={"center"}>
                            <Button sx={{ textTransform: "none", backgroundColor: "#3a3a3a", padding: 0, width: "100%" }}>
                                <Box display={"flex"} sx={{height: "40px", width: "100%"}}>
                                    <Box>
                                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"40px"} height={"40px"} borderRadius={2} />
                                    </Box>
                                    <Box mx={2} sx={{height: "40px", padding: 0, fontSize: "12px"}} display={"flex"} alignItems={"center"}>
                                        <Link to="/playlistMobile">Can</Link>
                                    </Box>
                                </Box>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )

}

export default PlaylistPreferidasMobile
