"use client"

import React from "react"
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ExploreIcon from "@mui/icons-material/Explore"
import HomeIcon from "@mui/icons-material/Home"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"

const Navbar = () => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up("md"))
  const isLg = useMediaQuery(theme.breakpoints.up("lg"))
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#000000" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="Logo">
          <Box
            component="img"
            src="/src/images/LogoProyecto.jpeg"
            alt="Logo"
            sx={{ width: { sm: "40px", md: "50px" }, height: { sm: "40px", md: "50px" } }}
          />
        </IconButton>

        {/* Buscador y botones de navegación */}
        {isMd && (
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center", mx: 2 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton sx={{ borderRadius: "50%", padding: "8px", backgroundColor: "#2C2C2C", mr: 1 }}>
                <HomeIcon sx={{ color: "white", fontSize: { md: 24, lg: 30 } }} />
              </IconButton>
            </Link>
            <TextField
              variant="filled"
              size="small"
              placeholder="Buscar"
              sx={{
                backgroundColor: "#2C2C2C",
                borderRadius: "30px",
                width: { md: "300px", lg: "500px" },
                "& .MuiFilledInput-root": {
                  height: { md: "40px", lg: "50px" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#B0B0B0", fontSize: { md: 24, lg: 35 } }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Link to="/contenido2" style={{ textDecoration: "none" }}>
                      <IconButton>
                        <ExploreIcon sx={{ color: "#B0B0B0", fontSize: { md: 24, lg: 35 } }} />
                      </IconButton>
                    </Link>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {/* Botones de acción */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLg && (
            <>
              <Button color="inherit">
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  sx={{
                    textTransform: "capitalize",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  Asistencia
                </Typography>
              </Button>
              <Button color="inherit">
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  sx={{
                    textTransform: "capitalize",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  Descargar
                </Typography>
              </Button>
              <Typography>|</Typography>
            </>
          )}
          {isMd ? (
            <>
              <Link to="/registro" style={{ textDecoration: "none", color: "#aeaeae" }}>
                <Button
                  color="inherit"
                  sx={{
                    mr: 1,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    "&:hover": { transform: "scale(1.1)", color: "#fff" },
                  }}
                >
                  Registrarse
                </Button>
              </Link>
              <Link to="/inicioSesion">
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: "white",
                    color: "#000000",
                    paddingX: { md: 2, lg: 3 },
                    borderRadius: 10,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    paddingY: { md: "8px", lg: "12px" },
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Iniciar sesión
                </Button>
              </Link>
            </>
          ) : (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Menú desplegable para pantallas pequeñas */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          Inicio
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/contenido2">
          Explorar
        </MenuItem>
        <MenuItem onClick={handleClose}>Asistencia</MenuItem>
        <MenuItem onClick={handleClose}>Descargar</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/registro">
          Registrarse
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/inicioSesion">
          Iniciar sesión
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar

