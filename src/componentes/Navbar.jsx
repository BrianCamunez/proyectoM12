import React from 'react';
import { AppBar, Toolbar, Box, IconButton, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
    return (
        <AppBar position='fixed' sx={{ width: '100%', backgroundColor: "#000000" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Box 1: Logo y buscador */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <IconButton edge="start" color="inherit" aria-label='Logo'>
                        <HomeIcon sx={{ fontSize: '30px' }} /> {/* Aquí pones el icono de tu logo */}
                    </IconButton>

                    {/* Buscador */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mx: 2 }}>
                        <TextField
                            variant='filled'
                            size='small'
                            placeholder='Buscar'
                            sx={{
                                backgroundColor: '#2C2C2C',  // Gris oscuro
                                borderRadius: '20px', // Bordes redondeados
                                width: '500px', // Ancho del campo de texto
                                '& .MuiFilledInput-root': {
                                    height: '40px', // Altura definida
                                    color: '#B0B0B0', // Texto gris claro
                                },
                                '& .MuiInputBase-input': {
                                    padding: '10px 14px',  // Relleno interno
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="center" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SearchIcon sx={{ color: '#B0B0B0' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="center" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ExploreIcon sx={{ color: '#B0B0B0' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>

                {/* Box 2: Login y registro */}
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#aeaeae' }}>
                    <Button color="inherit" sx={{ mr: 2 }}>Instalar app</Button>
                    <Button color="inherit" sx={{ mr: 2 }}>Registrarse</Button>
                    <Button color="inherit" sx={{ mr: 2, backgroundColor: 'white', color: '#000000', paddingX: 3, borderRadius: 10 }}>Iniciar sesión</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;