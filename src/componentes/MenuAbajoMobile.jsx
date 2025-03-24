import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';

const MenuAbajoMobile = () => {
    return (
        <>
            <Box display={"flex"} width={"100%"} justifyContent={"space-around"} bottom={0} position={"absolute"} paddingY={1} sx={{backgroundColor: "black"}}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    <HomeIcon />
                    <Box>Inicio</Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    <SearchIcon />
                    <Box>Buscar</Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    <BookmarkIcon />
                    <Box>Tu Biblioteca</Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    <AddIcon />
                    <Box>Crear</Box>
                </Box>
            </Box>
        </>
    );
};

export default MenuAbajoMobile;
