import React from "react";
import { Box, Button } from "@mui/material";


const NavbarMobile = () =>{

    return (
        <>
            <Box display={"flex"} gap={1} margin={1} mt={2} justifyContent={"left"} alignContent={"center"} py={1}>
                <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" alt="Imagen Perfil" sx={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                <Button sx={{backgroundColor: "#3a3a3a", borderRadius: 30, textTransform: "none", color: "white", paddingX: 2}}>Todos</Button>
                <Button sx={{backgroundColor: "#3a3a3a", borderRadius: 30, textTransform: "none", color: "white", paddingX: 2}}>Música</Button>
                <Button sx={{backgroundColor: "#3a3a3a", borderRadius: 30, textTransform: "none", color: "white", paddingX: 2}}>Pódcasts</Button>
            </Box>
        </>
    )

}

export default NavbarMobile