import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

const ContenidoPerfilMobile = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // retrocede una página en el historial
    };

    const mirarImagenClick = () => {

        document.getElementById("imagenInput").click();

    }

    const mirarCambiarImagen = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            console.log("Imagen seleccionada:", file);
        } else {
            alert("Por favor selecciona una imagen");
        }
    }

    return (
        <>
            <Box mx={2} rowGap={4} flexDirection={"column"} display={"flex"} mt={2}>
                <Box>
                    <KeyboardArrowDownIcon onClick={handleBackClick} sx={{ rotate: "90deg", fontSize: "50px" }} />
                </Box>
                <Box display={"flex"} alignItems="center" gap={3}>
                    <Box position="relative">
                        <Box component={"img"}  src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"150px"} height={"150px"} borderRadius={"50%"} onClick={mirarImagenClick} sx={{ cursor: "pointer" }}/>
                        <input type="file" id="imagenInput" hidden accept="image/*" onChange={mirarCambiarImagen}/>
                    </Box>
                    <Box>
                        <Box>Shikanoko</Box>
                        <Box>0 seguidores · 4 siguiendo</Box>
                    </Box>
                </Box>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Button sx={{ color: "white", border: "2px white solid", borderRadius: "30px", paddingX: "15px" }}>Editar</Button>
                    <IosShareIcon sx={{ color: "#cdcdcd", fontSize: "30px" }} />
                    <MoreHorizIcon sx={{ color: "#cdcdcd", fontSize: "30px" }} />
                </Box>
                <Box display={"flex"} gap={2} flexDirection={"column"} mt={2}>
                    <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>Listas</Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Box component={"img"} src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"50px"} height={"50px"}></Box>
                        <Box>
                            <Box>Nombre de la playlist</Box>
                            <Box sx={{ color: "#cdcdcd" }}>Guardada 0 veces · Creador</Box>
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Box component={"img"} src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"50px"} height={"50px"}></Box>
                        <Box>
                            <Box>Nombre de la playlist</Box>
                            <Box sx={{ color: "#cdcdcd" }}>Guardada 0 veces · Creador</Box>
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Box component={"img"} src="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg" width={"50px"} height={"50px"}></Box>
                        <Box>
                            <Box>Nombre de la playlist</Box>
                            <Box sx={{ color: "#cdcdcd" }}>Guardada 0 veces · Creador</Box>
                        </Box>
                    </Box>
                    <Box justifyContent={"center"} display={"flex"} alignItems={"center"} mt={2}>
                        <Button sx={{ color: "white", border: "1px #cdcdcd solid", borderRadius: "30px", paddingX: "15px" }}>Ver todas las listas</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ContenidoPerfilMobile;