import React from 'react';
import { AppBar, Toolbar, Box, IconButton, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
    return (
        <AppBar position='fixed' sx={{ width: '100%', backgroundColor: "#000000" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Box 1: Logo y buscador */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <IconButton edge="start" color="inherit" aria-label='Logo'>
                        <HomeIcon sx={{ fontSize: '30' }} />{/* Aquí pones el icono de tu logo */}
                    </IconButton>
                    {/* Logo */}
                    <IconButton edge="start" color="inherit" aria-label='Logo'>
                        <HomeIcon sx={{ fontSize: '30' }} />{/* Aquí pones el icono de tu logo */}
                    </IconButton>

                    {/* Buscador */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mx: 2 }}>
                        <TextField
                            variant='filled'
                            size='small'
                            fullWidth
                            placeholder='Buscar'
                            sx={{
                                backgroundColor: '#2C2C2C',  // Gris oscuro
                                borderRadius: '20px', // Bordes redondeados
                                width: '500px', // Ancho del campo de texto
                                '& .MuiOutlinedInput-root': {
                                    color: '#B0B0B0', // Texto gris claro
                                    '& fieldset': {
                                        border: 'none',  // Sin borde en el campo de texto
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: '#B0B0B0',  // Texto gris claro
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#B0B0B0' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
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
                    <Button color="inherit" sx={{ mr: 2, backgroundColor: 'white', color: '#000000'}}>Iniciar sesión</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
