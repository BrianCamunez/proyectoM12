import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const ContenidoExplorarMobile = () => {

    const cardData = [
        { color: "#761212", text: "Musica 1" },
        { color: "#767612", text: "Musica 2" },
        { color: "#761276", text: "Musica 3" },
        { color: "#161246", text: "Musica 4" },
        { color: "#768912", text: "Musica 1" },
        { color: "#767689", text: "Musica 2" },
        { color: "#131970", text: "Musica 3" },
        { color: "#168901", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
        { color: "#12a68f", text: "Musica 1" },
        { color: "#98f", text: "Musica 2" },
        { color: "#654a1a", text: "Musica 3" },
        { color: "#4c190a", text: "Musica 4" },
    ]

    return (
        <>
            <Box px={2} paddingTop={2}>
                <Box sx={{ backgroundColor: "white" }} mx={2} borderRadius={2} padding={1} display={"flex"} alignItems="center">
                    <TextField
                        fullWidth
                        variant="standard"  // Sin borde
                        placeholder="¿Qué te apetece escuchar?"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 30 }} /> {/* Ícono más grande */}
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            input: {
                                fontSize: 18,  // Texto más grande
                            },
                            "& .MuiInput-underline:before": {
                                borderBottom: "none",  // Eliminar la línea de abajo del borde cuando no está enfocado
                            },
                            "& .MuiInput-underline:after": {
                                borderBottom: "none",  // Eliminar la línea de abajo del borde cuando está enfocado
                            },
                            "& .Mui-focused .MuiInput-underline:after": {
                                borderBottom: "none", // Asegura que no aparezca una línea cuando está enfocado
                            },
                            "& .MuiInputBase-root": {
                                display: 'flex',
                                alignItems: 'center', // Centra verticalmente el ícono y el texto
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight={600} paddingTop={2} paddingBottom={1} color={"white"}>
                        Explorar todo
                    </Typography>
                    <Box px={2} paddingTop={2}>
      <Grid container spacing={2}>
        {cardData.map((_, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                backgroundColor: 'blue', // Fondo de color
                padding: 2,
                display: 'flex',
                height: '50px', // Altura fija
                borderRadius: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ color: 'white' }}>Texto {index + 1}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ContenidoExplorarMobile;
