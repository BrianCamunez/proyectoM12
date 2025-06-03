import { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from "../../supabase/supabase"; // asegúrate que esté el import correcto
import { useNavigate } from "react-router-dom";
import ReproductorMobile from "./ReproductorMobile";
import MenuAbajoMobile from "./MenuAbajoMobile";
import NavbarMobile from "./NavbarMobile"; // Asegúrate de que este componente exista y esté correctamente importado

const ContenidoExplorarMobile = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const validarSesion = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/registro");
            }
        };
        validarSesion();
    }, []);

     useEffect(() => {
    const fetchGeneros = async () => {
      const { data, error } = await supabase.rpc("obtener_generos_enum");

      if (error) {
        console.error("Error al obtener géneros:", error);
      } else {
        setGeneros(data);
      }
    };

    fetchGeneros();
  }, []);

    return (
        <>
            <NavbarMobile />
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
                                        backgroundColor: '#ff3f7f',
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
            </Box>
            <ReproductorMobile />
                <MenuAbajoMobile />
        </>
    );
};

export default ContenidoExplorarMobile;
