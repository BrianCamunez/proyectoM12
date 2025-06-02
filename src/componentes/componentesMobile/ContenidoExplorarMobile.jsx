import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from "../../supabase/supabase"; // asegúrate que esté el import correcto
import { useNavigate } from "react-router-dom";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";

const ContenidoExplorarMobile = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGeneros = async () => {
            const { data, error } = await supabase
                .from("canciones")
                .select("genero")
                .neq("genero", null); // excluir los nulos

            if (error) {
                console.error("Error al obtener géneros:", error);
            } else {
                const generosUnicos = [...new Set(data.map(item => item.genero))];
                setGeneros(generosUnicos);
            }
        };

        fetchGeneros();
    }, []);

    return (
        <>
            <Box px={2} paddingTop={2}>
                <Box sx={{ backgroundColor: "white" }} mx={2} borderRadius={2} padding={1} display={"flex"} alignItems="center">
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="¿Qué te apetece escuchar?"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 30 }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            input: { fontSize: 18 },
                            "& .MuiInput-underline:before": { borderBottom: "none" },
                            "& .MuiInput-underline:after": { borderBottom: "none" },
                            "& .Mui-focused .MuiInput-underline:after": { borderBottom: "none" },
                            "& .MuiInputBase-root": { display: 'flex', alignItems: 'center' },
                        }}
                    />
                </Box>

                <Typography variant="h5" fontWeight={600} paddingTop={2} paddingBottom={1} color={"white"} ml={2}>
                    Explorar todo
                </Typography>

                <Box px={2} paddingTop={2}>
                    <Grid container spacing={2}>
                        {generos.map((genero, index) => (
                            <Grid item xs={4} key={index}>
                                <Box
                                    sx={{
                                        backgroundColor: '#1DB954',
                                        padding: 2,
                                        height: '50px',
                                        borderRadius: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => navigate(`/genero/${encodeURIComponent(genero)}`)}
                                >
                                    <Typography sx={{ color: 'white', fontSize: 14 }}>{genero}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <ReproductorMobile />
                <MenuAbajoMobile />
            </Box>
        </>
    );
};

export default ContenidoExplorarMobile;
