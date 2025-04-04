import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NavbarMobile from "./NavbarMobile";
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContenidoBibliotecaListaMobile from "./ContenidoBibliotecaListaMobile";
import ContenidoBibliotecaGridMobile from "./ContenidoBibliotecaGridMobile";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";

const ContenidoBibliotecaMobile = () => {


    const [tipoVision, setTipoVision] = useState("lista");

    const cambiarVista = () => {
        setTipoVision(prev => prev === "lista" ? "grid" : "lista");
    };


    return (
        <>
            <NavbarMobile />
            <Box px={2}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box display={"flex"}>
                        <SwapVertIcon sx={{ color: "white" }} />
                        <Box>Recientes</Box>
                    </Box>
                    <Box>
                        {tipoVision === "lista" ? (
                            <GridViewIcon sx={{ color: "white", cursor: "pointer" }} onClick={cambiarVista} />
                        ) : (
                            <FormatListBulletedIcon sx={{ color: "white", cursor: "pointer" }} onClick={cambiarVista} />
                        )}
                    </Box>
                </Box>
                <Box>
                    {tipoVision === "lista" ? <ContenidoBibliotecaListaMobile /> : <ContenidoBibliotecaGridMobile />}
                </Box>
            </Box>
            <ReproductorMobile />
            <MenuAbajoMobile />
        </>
    );
};

export default ContenidoBibliotecaMobile;
