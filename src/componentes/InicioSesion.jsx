import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom'

const InicioSesion = () => {
    const [DatosFormulario, setDatosFormulario] = useState({
        correo: '',
        password: '',
    });

    const manejarInputs = (eventos) => {
        const { nombre, valor } = eventos.target;
        setDatosFormulario({
            ...DatosFormulario,
            [nombre]: valor,
        });
    };

    const manejarSubmit = (evento) => {
        evento.preventDefault();
        // Aquí puedes manejar el envío de los datos del formulario
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
                backgroundColor: "black", // Fondo negro
                color: "white", // Texto blanco
                padding: "20px",
            }}
        >

            {/* Caja con fondo gris que envuelve el contenido */}
            <Box
                sx={{
                    backgroundColor: "#121212", // Fondo gris para el formulario
                    padding: "40px",
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: "400px", // El formulario tiene un maximo ancho
                    boxShadow: 3, // Agregar sombra para mejor efecto visual
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center", // Centrado de los campos
                }}
            >
                {/* Imagen superior */}
                <Link to="/">
                    <Box
                        component="img"
                        src="/src/images/LogoProyecto.jpeg"
                        alt="Logo"
                        sx={{
                            width: "100px", // Ajusta el tamaño según sea necesario
                            height: "auto",
                            marginBottom: "30px",
                            borderRadius: 20
                        }}
                    />
                </Link>

                <Typography variant="h5" fontSize={30} fontWeight={'bold'} sx={{ marginBottom: 2 }}>
                    Inicia sesión en NoiseHub
                </Typography>
                {/* Campo de correo */}
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
                            backgroundColor: "black", // Fondo negro
                            color: "white", // Texto blanco
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white", // Borde blanco
                                },
                                "&:hover fieldset": {
                                    borderColor: "white", // Borde blanco al pasar el mouse
                                },
                            },
                        }}
                    />
                </Box>

                {/* Campo de contraseña */}
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
                            backgroundColor: "black", // Fondo negro
                            color: "white", // Texto blanco
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white", // Borde blanco
                                },
                                "&:hover fieldset": {
                                    borderColor: "white", // Borde blanco al pasar el mouse
                                },
                            },
                        }}
                    />
                </Box>

                {/* Botón de inicio sesión */}
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
                            backgroundColor: "#E81D50",
                        },
                    }}
                >
                    Iniciar sesión
                </Button>
                <Box
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                        ¿No tienes cuenta?
                    </Typography>
                    <Link
                        to="/registro"
                        style={{
                            color: "white", // Color blanco para el texto
                            textDecoration: "none", // Eliminar la subrayado del texto
                            cursor: "pointer", // Cambiar el cursor para indicar que es un enlace
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#E91E63")} // Color al pasar el ratón
                        onMouseOut={(e) => (e.target.style.color = "white")} // Restablecer el color
                    >
                        Suscríbete a NoiseHub
                    </Link>
                </Box>

            </Box>
        </Box>
    );
}

export default InicioSesion;
