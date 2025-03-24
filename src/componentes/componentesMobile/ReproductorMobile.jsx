import { Box } from "@mui/material";
import SpeakerIcon from '@mui/icons-material/Speaker';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ReproductorMobile = () => {
    return (
        <>
            <Box display={"flex"} width={"100%"} justifyContent={"space-around"} position={"absolute"} bottom={60} alignItems={"center"}>
                <Box 
                    display={"flex"} 
                    padding={1} 
                    sx={{ 
                        backgroundColor: "#ff4081", 
                        marginX: 1, 
                        width: "100%", 
                        borderRadius: 2, 
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Box component="img" src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"40px"} height={"40px"} borderRadius={2} />
                        <Box ml={1}>
                            <Box>Bones · Imagine Dragons</Box>
                            <Box>JBL Live 770NC</Box>
                        </Box>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                        <SpeakerIcon sx={{ fontSize: 30, marginRight: 2 }} />
                        <PlayArrowIcon sx={{ fontSize: 30 }} />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ReproductorMobile;
