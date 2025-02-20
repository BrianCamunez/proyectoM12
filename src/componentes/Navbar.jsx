import React from "react";
import { AppBar, Toolbar, Box, IconButton, TextField, Button, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom'
import { Scale } from "@mui/icons-material";

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#000000" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* Box 1: Logo y buscador */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <IconButton edge="start" color="inherit" aria-label="Logo">
                        <Box
                            component="img"
                            src="/src/images/LogoProyecto.jpeg"
                            alt="Logo"
                            sx={{ width: "50px", height: "50px" }} // Ajusta el tamaño según sea necesario
                        />
                    </IconButton>

                    {/* Buscador */}
                    <Box
                        sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: 'flex-end', mx: 2 }}
                    >
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <IconButton sx={{ borderRadius: '50%', padding: '8px', backgroundColor: '#2C2C2C', mr: 1 }}>
                                <HomeIcon sx={{ color: "white", fontSize: 30 }} />
                            </IconButton>
                        </Link>
                        <TextField
                            variant="filled"
                            size="small"
                            placeholder="Buscar"
                            sx={{
                                backgroundColor: "#2C2C2C", // Gris oscuro
                                borderRadius: "30px", // Bordes redondeados
                                width: "500px", // Ancho del campo de texto
                                boxShadow: 'none',
                                "& .MuiFilledInput-root": {
                                    height: "50px", // Altura definida
                                    color: "#B0B0B0", // Texto gris claro
                                },
                                "& .MuiInputBase-input": {
                                    padding: "10px 14px", // Relleno interno
                                },
                                "& .MuiFilledInput-underline:before": {
                                    borderBottom: "none", // Sin línea
                                },
                                "& .MuiFilledInput-underline:hover:before": {
                                    borderBottom: "none", // Sin línea al hacer hover
                                },
                                "& .MuiFilledInput-underline:after": {
                                    borderBottom: "none", // Sin línea después de hacer clic
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="center"
                                        sx={{ display: "flex", alignItems: "center" }}
                                    >
                                        <SearchIcon sx={{ color: "#B0B0B0", fontSize: 35 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="center"
                                        sx={{ display: "flex", alignItems: "center" }}
                                    >
                                        <Link to="/contenido2" style={{ textDecoration: 'none' }}>
                                            <IconButton>
                                                <ExploreIcon sx={{ color: "#B0B0B0", fontSize: 35 }} />
                                            </IconButton>
                                        </Link>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: "center", color: "#aeaeae" }}>
                    <Button color="inherit">
                        <Typography variant="body3" fontWeight={'bold'} sx={{ textTransform: 'capitalize',  transition: 'transform 0.3s ease', '&:hover': {transform: 'scale(1.1)'} }}>Asistencia</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography variant="body3" fontWeight={'bold'} sx={{ textTransform: 'capitalize',  transition: 'transform 0.3s ease', '&:hover': {transform: 'scale(1.1)'} }}>Descargar</Typography>
                    </Button>
                    <Typography>|</Typography>
                </Box>

                {/* Box 2: Login y registro */}
                <Box sx={{ display: "flex", alignItems: "center", color: "#aeaeae" }}>
                    <Button color="inherit" sx={{ mr: 2,  transition: 'transform 0.3s ease', '&:hover': {transform: 'scale(1.1)'} }}>
                        <Typography variant="body3" sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}><DownloadIcon sx={{ fontSize: 20 }} />Instalar app</Typography>
                    </Button>
                    <Link to="/registro" style={{ textDecoration: 'none', color: "#aeaeae" }}>
                        <Button color="inherit" sx={{ mr: 2, textTransform: 'capitalize', fontWeight: 'bold', transition: 'transform 0.3s ease, color 0.3s ease', '&:hover': {transform: 'scale(1.1)', color: '#fff'} }}>
                            Registrarse
                        </Button>
                    </Link>
                    <Link to='/inicioSesion'>
                        <Button
                            color="inherit"
                            sx={{
                                mr: 2,
                                backgroundColor: "white",
                                color: "#000000",
                                paddingX: 3,
                                borderRadius: 10,
                                textTransform: 'capitalize', fontWeight: 'bold',
                                paddingY: '12px',
                                transition: 'transform 0.3s ease',
                                '&:hover':{
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
