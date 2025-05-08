import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const RegistroComponente = () => {
    const [DatosFormulario, setDatosFormulario] = useState({
        correo: '',
        usuario: '',
        password: '',
    });

    const manejarInputs = (eventos) => {
        const { name, value } = eventos.target;
        setDatosFormulario({
            ...DatosFormulario,
            [name]: value,
        });
    };

    const manejarSubmit = (evento) => {
        evento.preventDefault();
        console.log('Formulario enviado:', DatosFormulario);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "black",
                color: "white",
                padding: "20px",
            }}
        >
            <Link to="/">
                <Box
                    component="img"
                    src="/src/images/LogoProyecto.jpeg"
                    alt="Logo"
                    sx={{
                        width: { xs: "80px", sm: "100px" },
                        height: "auto",
                        marginBottom: "30px",
                    }}
                />
            </Link>

            <Typography
                variant="h5"
                fontSize={{ xs: 24, sm: 30 }}
                fontWeight={'bold'}
                sx={{ marginBottom: 2 }}
            >
                Regístrate para empezar a escuchar contenido
            </Typography>

            <Box
                component="form"
                onSubmit={manejarSubmit}
                sx={{
                    width: { xs: "90vw", sm: "60vw", md: "40vw", lg: "20vw" },
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: "black",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: 2,
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography sx={{ color: "white", marginBottom: 1 }}>Correo electrónico</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        name="correo"
                        value={DatosFormulario.correo}
                        onChange={manejarInputs}
                        InputLabelProps={{
                            style: { color: "white", fontSize: "14px" },
                        }}
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white",
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography sx={{ color: "white", marginBottom: 1 }}>Usuario</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="usuario"
                        value={DatosFormulario.usuario}
                        onChange={manejarInputs}
                        InputLabelProps={{
                            style: { color: "white", fontSize: "14px" },
                        }}
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white",
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography sx={{ color: "white", marginBottom: 1 }}>Contraseña</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        name="password"
                        value={DatosFormulario.password}
                        onChange={manejarInputs}
                        InputLabelProps={{
                            style: { color: "white", fontSize: "14px" },
                        }}
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white",
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                            },
                        }}
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        height: '50px',
                        width: '100%',
                        borderRadius: 10,
                        marginTop: 2,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        backgroundColor: "#E91E63",
                        "&:hover": {
                            backgroundColor: "#E91E50",
                        },
                    }}
                >
                    Registrarse
                </Button>
                <Box
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                    <Typography variant="body2" sx={{ color: "white", marginRight: 1 }}>
                        ¿Ya tienes una cuenta?
                    </Typography>
                    <Link
                        to="/inicioSesion"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#E91E63")}
                        onMouseOut={(e) => (e.target.style.color = "white")}
                    >
                        Inicia sesión aquí.
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default RegistroComponente;
