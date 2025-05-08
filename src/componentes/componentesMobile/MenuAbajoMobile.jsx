import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

const MenuAbajoMobile = () => {
    return (
        <>
            <Box display={"flex"} width={"100%"} justifyContent={"space-around"} bottom={0} position={"absolute"} paddingY={1} sx={{ backgroundColor: "black", opacity: 0.97 }}>
                <Link to="/">
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} sx={{ textDecoration: "none", color: "white" }}>
                        <HomeIcon />
                        <Box>Inicio</Box>
                    </Box>
                </Link>
                <Link to="/explorarMobile">
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} sx={{ textDecoration: "none", color: "white" }}>
                        <SearchIcon />
                        <Box>Buscar</Box>
                    </Box>
                </Link>
                <Link to="/biblioteca">
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} sx={{ textDecoration: "none", color: "white" }}>
                        <BookmarkIcon />
                        <Box>Tu Biblioteca</Box>
                    </Box>
                </Link>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    <AddIcon />
                    <Box>Crear</Box>
                </Box>
            </Box>
        </>
    );
};

export default MenuAbajoMobile;
